(ns #^{:author "John"
       :doc "A collection of all avro types"}
  tikvah.avro-types
  (:use [tikvah.commons])
  (:import [org.apache.avro.util Utf8]))


(defprotocol AvroType
  (avro-value [this])
  )

(extend-type java.lang.Object AvroType
  (avro-value [this]
    (.toString this)
    )
  )

(extend-type java.lang.Integer AvroType
  (avro-value [this] (Utf8. (int this)))
  )

