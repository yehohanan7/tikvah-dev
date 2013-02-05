(ns tikvah.store.core)

(defprotocol Store
  (collection [this name])
  (connect! [this])
  )

(defprotocol Collection
  (scan [this predicate])
  (add [this data])
  )
