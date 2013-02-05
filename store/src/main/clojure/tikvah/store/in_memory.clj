(ns tikvah.store.in-memory
  (:use [tikvah.store.core])
  (:use tikvah.commons))

(deftype InMemoryStore [m] Store
  (collection [this collection-name]
    m
    )

  (connect! [this]
    m
    )
  )

(extend-protocol Collection clojure.lang.IPersistentMap
                 (scan [this predicate]
                   (filter predicate this)
                   )

                 (add [this data]
                   (assoc this data)
                   )
  )

(defn store [] (InMemoryStore. {}))






