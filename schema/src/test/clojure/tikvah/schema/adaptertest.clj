(ns tikvah.schema.adaptertest
  (:use tikvah.schema)
  (:use tikvah.schema.locator)
  (:use tikvah.schema.adapter)
  (:use clojure.test))



(deftest should-convert-dashes-to-camel-case
  (is (= (dash-to-camel "first-name") "firstName"))
  (is (= (dash-to-camel "first-name-extended") "firstNameExtended"))
  )







