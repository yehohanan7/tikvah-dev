(ns tikvah.schematests
  (:use tikvah.schema)
  (:use clojure.test))


(defn person [fields]
  (with-meta fields {:tikvah-type :tikvah-model-person-Person})
  )

(deftest should-locate-schema-file
  (is (not (nil? (locate-schema (person {:first-name "John" :middle-name "Pradeep" :last-name "Vincent"})))))
  )

(deftest should-serialize-maps
  (let [input (person {:first-name "John" :middle-name "Pradeep" :last-name "Vincent"})]
    (is (not (nil? (serialize input))))
    )
  )


(deftest should-convert-dashes-to-camel-case
  (is (= (dash-to-camel "first-name") "firstName"))
  (is (= (dash-to-camel "first-name-extended") "firstNameExtended"))

  )




