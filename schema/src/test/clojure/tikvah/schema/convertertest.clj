(ns tikvah.schema.convertertest
  (:use tikvah.schema)
  (:use tikvah.schema.locator)
  (:use tikvah.schema.converter)
  (:use clojure.test))



(deftest should-convert-dashes-to-camel-case
  (is (= (dash-to-camel "first-name") "firstName"))
  (is (= (dash-to-camel "first-name-extended") "firstNameExtended"))
  )





