(defproject tikvah.store "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [midje "1.4.0"]
                 [tikvah.commons "0.1.0-SNAPSHOT"]
                 [org.mongodb/mongo-java-driver "1.3"]]
  :source-paths ["src/main/clojure"]
  :test-paths   ["src/test/clojure"]
  :plugins [[lein-midje "2.0.4"]])
