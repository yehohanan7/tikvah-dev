(ns tikvah.widgets.autocomplete
  (:require [goog.net.XhrIo :as xhr]
            [domina :as dom]
            [domina.css :as css]
            [domina.events :as events]))


(let [text-box (css/sel "#sample")
      _ (events/listen! text-box :keypress (fn [e] (dom/log "key pressed")))]
  )

