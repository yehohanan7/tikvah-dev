(ns tikvah.schematest
  (:require [tikvah.schema :as schema])
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
        serialized-data (schema/serialize sample-person)
        actual-properties (.getProperties (schema/deserialize (Person.) serialized-data))
        ]

    (is (= (.getName actual-properties) "John"))
    (is (= (.getAge expected-properties) 28))
    )
  )
