(ns tikvah.widgets.product.productfinder)

(def catalog [{:id "1" :name "Mac book pro" :price "$22112" :available "ok"}
              {:id "1" :name "Mac book pro" :price "$22112" :available "ok"}
              {:id "1" :name "Mac book pro" :price "$22112" :available "remove"}
              {:id "1" :name "Mac book pro" :price "$22112" :available "ok"}])

(defn map->js [m]
  (let [out (js-obj)]
    (doseq [[k v] m]
      (aset out (name k) v))
    out))


(defn find-product [scope]
  (fn []
    (doseq [p catalog]
      (.push (.-products scope) (map->js p))
      )
    )
  )

(defn CTProductCtrl [$scope]
  (def $scope.products (array))
  (def $scope.find (find-product $scope))
  )


(def ProductCtrl
  (array
    "$scope"
    CTProductCtrl))
