(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"}
  tikvah.schema
  (:use [tikvah.commons])
  (:import [org.apache.avro Schema]
           [org.apache.avro.generic GenericDatumWriter GenericDatumReader GenericData GenericData$Record]
           [org.apache.avro.io BinaryEncoder EncoderFactory]
           [java.io ByteArrayOutputStream]
           [org.apache.avro.util Utf8]))


(set! *warn-on-reflection* true)

(defn- valid-model? [x]
  (and (not-nil? x)
    (not-nil? (meta x))
    (not-nil? (:tikvah-type (meta x))))
  )

(defn- schema-path-for [model]
  (str (clojure.string/replace (name (:tikvah-type (meta model))) #"-" "/") ".avsc")
  )

(defn- ^java.io.File locate-file [path]
  (clojure.java.io/as-file (clojure.java.io/resource path))
  )

(defn- locate-schema-file [model]
  {:pre [(valid-model? model)]}
  (Schema/parse (locate-file (schema-path-for model)))
  )

(def locate-schema (memoize locate-schema-file))

(defn dash-to-camel [x]
  (let [input (name x)]
    (clojure.string/replace input #"-." (fn [i] (clojure.string/upper-case (second i))))
    )
  )

(defn- to-record [model]
  (let [schema (locate-schema model)
        record (GenericData$Record. schema)]
    (doseq [[k v] model]
      (.put record (dash-to-camel k) (Utf8. v))
      )
    record
    )
  )


(defprotocol FlexiData
  (serialize [model])
  (deserialize [model bytes])
  )

(extend-type java.lang.Object FlexiData
  (serialize [model]

    )

  (deserialize [model bytes]
    )
  )

(extend-type clojure.lang.IPersistentMap FlexiData

  (serialize [model]
    (let [record (to-record model)
          stream (ByteArrayOutputStream.)
          schema (locate-schema model)
          writer (GenericDatumWriter. schema)
          encoder (.binaryEncoder (EncoderFactory/get) stream nil)
          _ (.write writer record encoder)
          _ (.flush encoder)
          _ (.close stream)]
      (.toByteArray stream)
      )
    )

  (deserialize [model bytes]
    "deserializing map..."
    )
  )

