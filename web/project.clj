(defproject tikvah/web "0.1.0-SNAPSHOT"
  :description "Web Layer for tikvah"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/clojurescript "0.0-1450"]
                 [compojure "1.1.0"]
                 [domina "1.0.0"]
                 [ring/ring-jetty-adapter "1.1.1"]
                 [clj-json/clj-json "0.5.1"]]

  :main tikvah.server

  :source-paths ["src/main/clojure"]
  :test-paths ["src/test/clojure"]
  )
