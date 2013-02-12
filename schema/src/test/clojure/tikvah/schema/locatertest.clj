(ns tikvah.schema.locatertest
  (:use tikvah.schema)
  (:use tikvah.schema.locator)
  (:use tikvah.schema.adapter)
  (:use clojure.test))


(defn person [fields]
  (with-meta fields {:tikvah-type :tikvah-model-person-Person})
  )

(deftest should-locate-schema-file
  (is (not (nil? (locate-schema (person {:first-name "John" :middle-name "Pradeep" :last-name "Vincent"})))))
  )


