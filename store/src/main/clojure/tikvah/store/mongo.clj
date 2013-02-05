(ns tikvah.store.mongo
  (:use [tikvah.store.core])
  (:use tikvah.commons)
  (:import [com.mongodb DB DBCollection BasicDBObject BasicDBList DBObject DBCursor Mongo]))

;;predicates

(defn $eq [k v]
  (fn [query] (.put query (name k) v))
  )

(defn $gt [k v] ()
  (fn [query] (.put query (name k) (BasicDBObject. "$gt" v)))
  )

(defn $ne [k v]
  (fn [query] (.put query (name k) (BasicDBObject.  "$ne" v)))
  )
;;end of predicates

;;Mongo specific object to Clojure map (deserializers)

(defprotocol MongoDataConverter
  "converts com.mongodb.BasicDBObject to clojure map"
  (convert [this])
  )

(extend-protocol MongoDataConverter java.lang.Object
    (convert [this] (str this))
    )

(extend-protocol MongoDataConverter com.mongodb.BasicDBList
    (convert [this] (map convert this))
    )

(defn to-map [dbobject]
  (apply merge (map #(let [[k v] %] {(keyword k) (convert v)}) (.get dbobject "value"))) 
  )

;; end of deserializer

(def ^{:private true} mongodb (atom nil))

(defn- connected? []
  (not (nil? @mongodb))
  )

(defn- cursor [collection predicate]
  (if (nil? predicate)
    (.find collection)
    (.find collection (doto (BasicDBObject.) (predicate))))
  )


(defn mongo-collection [cursor]
  (lazy-seq
    (if (.hasNext cursor)
      (cons (to-map (.next cursor)) (mongo-collection cursor))
      nil
      )
    )
  )


;; Persistent data structure to Mongo specific object (serializers)
(defprotocol BasicDBObjectUpdater
  (to-basicobject [this])
  )

(extend-protocol BasicDBObjectUpdater java.lang.Object
  (to-basicobject [this] (str this))
  )

(extend-protocol BasicDBObjectUpdater clojure.lang.IPersistentMap
  (to-basicobject [this]
    (doto (BasicDBObject.) (#(doseq [[k v] this] (.put % (name k) (to-basicobject v)))))
    )
  )

(extend-protocol BasicDBObjectUpdater clojure.lang.IPersistentCollection
  (to-basicobject [this]
    this
    )
  )

;; end of serializers




(deftype MongoCollection [collection-name store]
  Collection
  (scan [this predicate]
    (let [connection (connect! store)
          collection (.getCollection @connection (name collection-name))
          cursor (cursor collection predicate)]
      (mongo-collection cursor)
      )
    )

  (add [this data]
    (let [connection (connect! store)
          collection (.getCollection @connection (name collection-name))
          dbobject (to-basicobject data)]
      (.insert collection dbobject)
      )
    )
  )

(deftype MongoStore [name host port] Store
  (collection [this collection-name]
    (MongoCollection. collection-name this)
    )

  (connect! [this]
    (if-not (connected?)
      (do
        (println "establishing mongo db connection.....")
        (reset! mongodb (.getDB (Mongo. host port) name))
        mongodb
        )
      mongodb
      )
    )
  )


(defn mongo-store [name {:keys [host port]}]
  (MongoStore. name host port)
  )


(defn test-coll []
  ;(-> (mongo-store "tikvah" {:host "localhost" :port 27017}) (collection :products ) (scan ($gt :id "1")))
  ;;(use 'com.tikvah.db.core) (use 'com.tikvah.db.store) (use 'com.tikvah.db.mongo.core)
  ;;(-> (mongo-store "tikvah" {:host "localhost" :port 27017}) (collection :products ) (add {:id "7777" :name "super product" :price "555"}))
  )




