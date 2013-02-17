(defproject tikvah/web "0.1.0-SNAPSHOT"
  :description "Web Layer for tikvah"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]]

  :source-paths ["src/main/clojure" "src/main/cljs"]
  :test-paths ["src/test/clojure"]

  :plugins [[lein-cljsbuild "0.2.7"]]
  :cljsbuild {
               :builds [{
                          :source-path "src/main/cljs"
                          :compiler {
                                      :output-to "src/main/webapp/js/tikvah.js"
                                      :optimizations :whitespace
                                      :pretty-print true}}]})
