(ns tikvah.sample
  (:import [org.apache.thrift TSerializer TDeserializer]
           [org.apache.thrift.protocol TBinaryProtocol TBinaryProtocol$Factory]))

(defn person-id []
  (doto (PersonID.) (.setEmail "yehohanan7@gmail.com"))
  )

(defn person-property-value []
  (doto (PersonPropertyValue.) (.setName "john") (.setAge 28) (.setGender (Gender/MALE)))
  )

(defn person []
  (doto (PersonProperty.) (.setId (person-id)) (.setProperty (person-property-value)))
  )

(let [serializer (TSerializer. (TBinaryProtocol$Factory.))
      desrializer (TDeserializer. (TBinaryProtocol$Factory.))
      data (DataUnit.)
      _ (.setPerson_property data (person))
      bytes (.serialize serializer data)]
  (println "data:bytes: " bytes)
  )


