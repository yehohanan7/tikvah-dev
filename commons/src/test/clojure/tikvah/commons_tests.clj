(ns tikvah.commons-tests
  (:use [tikvah.commons])
  (:use [midje.sweet]))

(fact (not-nil? "xyz") => true)

(fact (not-nil? nil) => false)

