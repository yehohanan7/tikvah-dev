(ns tikvah.schematest
  (:use tikvah.schema)
  (:use clojure.test)
  (:import [tikvah.test.model.person Person Gender PersonID PersonProperties]))


(defn person-id []
  (doto (PersonID.) (.setEmail "john@tikvah.com"))
  )

(defn person-properties []
  (doto (PersonProperties.) (.setName "John") (.setAge 28))
  )

(def sample-person (doto (Person.)
                     (.setId (person-id))
                     (.setProperties (person-properties))
                     )
  )

(deftest should-serialize-and-deserialize-back
  (let [expected-properties (.getProperties sample-person)
        serialized-data (serialize sample-person)
        actual-properties (.getProperties (deserialize (Person.) serialized-data))
        ]

    (is (= "John" (.getName actual-properties)))
    (is (= 28 (.getAge expected-properties)))
    )
  )


(deftest should-serialize-maps
  (let [person {:person-id {:email "john@tikvah.com"}
                :person-properties {:name "John" :age 28}}
        serialized-person (serialize person)]
    (is true)
    )
  )


