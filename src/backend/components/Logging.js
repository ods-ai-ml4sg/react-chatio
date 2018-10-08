var intel = require('intel');

//
// TODO: named loggers, logging namespaces
//

// Logging singleton
export default class Logging {

    static instance;

    constructor(level, logfile){
        if(Logging.instance){
            return instance;
        }

        this.instance = this;

        if(logfile) {
            intel.addHandler(new intel.handlers.File(logfile));
        }

        switch (level) {
            case 'DEBUG':
                this.log = intel.debug;
                intel.setLevel(intel.DEBUG);
                break;
            case 'INFO':
                this.log = intel.info;
                intel.setLevel(intel.INFO);
                break;
            case 'WARN':
                this.log = intel.warn;
                intel.setLevel(intel.WARN);
                break;
            // default to ERROR
            default:
                this.log = intel.error;
                intel.setLevel(intel.ERROR);
        }
    }

    // Expose log levels
    get DEBUG () {return "DEBUG"}
    get INFO () {return "INFO"}
    get WARN () {return "WARN"}
    get ERROR () {return "ERROR"}

}