(ns tikvah.framework)

;(def behaviours {
;                  :speak (fn [this] (println this "is speaking.."))
;                  })
;
;
;(defprotocol Entity
;  (call [this behaviour])
;  )
;
;(extend-type clojure.lang.IPersistentMap Entity
;  (call [this behaviour]
;    ((behaviour behaviours) this)
;    )
;  )
;
;(defn entity [id & attributes]
;  (apply merge {:id id}
;    (map vec (partition 2 attributes)))
;  )
;
;
;
;(let [p (entity :person
;                :behaviours [:speak]
;                :state {:name "John"})]
;  (call p :speak)
;  )


