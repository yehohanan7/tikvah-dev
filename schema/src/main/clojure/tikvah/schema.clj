(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"}
  tikvah.schema
  (:use [tikvah.commons])
  (:use [tikvah.schema-locator])
  (:use [tikvah.record-converter])
  (:import [org.apache.avro Schema]
           [org.apache.avro.generic GenericDatumWriter GenericDatumReader GenericData GenericData$Record]
           [org.apache.avro.io BinaryEncoder EncoderFactory]
           [java.io ByteArrayOutputStream]
           [org.apache.avro.util Utf8]))


(set! *warn-on-reflection* true)

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

