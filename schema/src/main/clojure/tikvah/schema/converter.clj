(ns #^{:author "John"
       :doc "used to convert clojure maps into avro model"}
  tikvah.schema.converter
  (:use [tikvah.commons])
  (:use [tikvah.schema.avro-types])
  (:use [tikvah.schema.locator])
  (:import [org.apache.avro Schema]
           [org.apache.avro.generic GenericData$Record]
           [org.apache.avro.util Utf8]))


(defn- valid-model? [x]
  (and (not-nil? x)
    (not-nil? (meta x))
    (not-nil? (:tikvah-type (meta x))))
  )


(defn dash-to-camel [x]
  (let [input (name x)]
    (clojure.string/replace input #"-." (fn [i] (clojure.string/upper-case (second i))))
    )
  )


(defn to-record [model]
  {:pre [(valid-model? model)]}
  (let [schema (locate-schema model)
        record (GenericData$Record. schema)]
    (doseq [[k v] model]
      (.put record (dash-to-camel k) (avro-value v))
      )
    record
    )
  )