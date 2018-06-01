@Library('dotnet-ci') _

// 'node' indicates to Jenkins that the enclosed block runs on a node that matches
// the label 'windows-with-vs'
simpleNode('Windows-10-Enterprise-RS4-ASPNET-es-ES-05-08-2018') {
    stage ('Checking out source') {
        checkout scm
    }
    stage ('Build') {
        def logFolder = getLogFolder()
        def environment = "set ASPNETCORE_TEST_LOG_DIR=${WORKSPACE}\\${logFolder}"
        bat "${environment}&.\\run.cmd -CI default-build"
    }
}
