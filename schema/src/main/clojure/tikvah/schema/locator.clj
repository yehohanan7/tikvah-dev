(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"}
  tikvah.schema.locator
  (:use [tikvah.commons])
  (:import [org.apache.avro Schema]))


(set! *warn-on-reflection* true)


(defn- with-extension [path]
  (str path ".avsc")
  )

(defn- ^java.io.File locate-file [model]
  (let [model-name (name (:tikvah-type (meta model)))
        path (with-extension (clojure.string/replace model-name #"-" "/"))]
    (clojure.java.io/as-file (clojure.java.io/resource path))
    )
  )

(defn- locate-schema-file [model]
  (Schema/parse (locate-file model))
  )

(def locate-schema (memoize locate-schema-file))