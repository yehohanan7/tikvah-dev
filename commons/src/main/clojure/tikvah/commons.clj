(ns #^{:author "John"
       :doc "All common code across tikvah"} tikvah.commons)

(defmacro ? "macro to simplify if/else block"
  [predicate x y]
  `(if ~predicate ~x ~y)
  )


(defn mapreduce
  ([mapper reducer data] (reduce reducer (map mapper data)))
  ([mapper reducer initial data] (reduce reducer initial (map mapper data)))
  )

(defmacro -- [x]
  (dec x)
  )

(defmacro ++ [x]
  (inc x)
  )

(def car first)

(def cdr rest)


(defn not-nil? [x]
  (not (nil? x))
  )
