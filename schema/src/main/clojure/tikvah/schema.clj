(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"} tikvah.schema
  (:import [org.apache.thrift TSerializer TDeserializer]
           [org.apache.thrift.protocol TBinaryProtocol TBinaryProtocol$Factory]))


(def serializer (TSerializer. (TBinaryProtocol$Factory.)))
(def de-serializer (TDeserializer. (TBinaryProtocol$Factory.)))


(defprotocol Schema
  (serialize [this])
  (deserialize [this bytes])
  )

(extend-type clojure.lang.IPersistentMap Schema
  (serialize [this]
    "map is serialized..."
    )

  (deserialize [this bytes]
    "map is serialized to a specific target"
    )
  )

(extend-type java.lang.Object Schema
  (serialize [this]
    (.serialize serializer this)
    )

  (deserialize [this bytes]
    (.deserialize de-serializer this bytes)
    this
    )
  )


