(ns #^{:author "John"
       :doc "A utility to serialize/deserialize clojure types into a language neutral schema to
       enforce data integrity at the persistent layer"} tikvah.schema
  (:import [org.apache.thrift TSerializer TDeserializer]
           [org.apache.thrift.protocol TBinaryProtocol TBinaryProtocol$Factory]))


(def serializer (TSerializer. (TBinaryProtocol$Factory.)))
(def de-serializer (TDeserializer. (TBinaryProtocol$Factory.)))

(defn serialize "Serializes the input boject into bytes" [input]
  (.serialize serializer input)
  )

(defn deserialize "Desrializes the byte stream into corresponding objects" [container input]
  (.deserialize de-serializer container input)
  container
  )
