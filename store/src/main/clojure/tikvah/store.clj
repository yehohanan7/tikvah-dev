(ns tikvah.store
  (:use [clojure.java.shell])
  (:require [tikvah.store.in-memory :as in-memory])
  (:require [tikvah.store.mongo :as mongo]))

(def $gt mongo/$gt)
(def $eq mongo/$eq)


(def stores {:in-memory (in-memory/store)})

(defn store
  ([name] (store name {:host "localhost" :port 27017}))
  ([name options] (mongo/mongo-store name options))
  )


(defn get-store [store-type]
  (store-type stores)
  )
