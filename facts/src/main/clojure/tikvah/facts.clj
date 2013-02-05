(ns tikvah.facts
  (:use [com.tikvah.db.core])
  (:use [com.tikvah.db.store])
  (:require [clj-time.core :as dt]))


(defn new-fact [type subject verb object]
  (-> (store "tikvah") (collection type) (add {:id subject :type (name verb) :value object :timestamp (dt/now)}))
  )