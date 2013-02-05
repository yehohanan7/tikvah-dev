(ns tikvah.storetests
  (:use clojure.test
        midje.sweet
        tikvah.store))
(def ^{:dynamic true} *store-type*)

(binding [*store-type* :in-memory]
  (let [my-store (get-store :in-memory)]
    (fact my-store => (comp not nil?))

    ) 
  )




