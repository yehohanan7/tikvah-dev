(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"} tikvah.schema
  (:import [org.apache.thrift TSerializer TDeserializer]
           [org.apache.thrift.protocol TBinaryProtocol TBinaryProtocol$Factory]))


(set! *warn-on-reflection* true)

(def serializer (TSerializer. (TBinaryProtocol$Factory.)))
(def de-serializer (TDeserializer. (TBinaryProtocol$Factory.)))


(defprotocol Schema
  (serialize [this])
  (deserialize [this bytes])
  )

(extend-type java.lang.Object Schema
  (serialize [this]
    (.serialize serializer this)
    )

  (deserialize [this bytes]
    (let [_ (.deserialize de-serializer this bytes)]
      this
      )
    )
  )

(extend-type clojure.lang.IPersistentMap Schema
  (serialize [this]
    (println "serializing map...")
    )

  (deserialize [this bytes]
    "deserializing map..."
    )
  )
