
const PENDING = '0'
const RESOLVED = '1'
const REJECTED = '2'
class Promise {
    constructor(executor) {
        this.stauts = PENDING
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallBacks = []
        this.onRejectedCallBacks = []
        let resolve = (value) => {
            if(this.stauts === PENDING) {
                this.stauts = RESOLVED
                this.value = value
                this.onResolvedCallBacks.forEach(n => n())
            }
        }
        let reject = (reason) => {
            if(this.stauts === PENDING) {
                this.stauts = REJECTED
                this.reason = reason
                this.onRejectedCallBacks.forEach(n => n())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            this.reason = e
            reject(this.reason)
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            try {
                if(this.stauts === RESOLVED) {
                    let x = onFulfilled(this.value)
                    resolve(x)
                }
                if (this.stauts === REJECTED) {
                    resolve(onRejected(this.reason))
                }
                if(this.stauts === PENDING) {
                    this.onResolvedCallBacks.push(() => {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    })
                    this.onRejectedCallBacks.push(() => {
                        resolve(onRejected(this.reason))
                    })
                }
            } catch (e) {
                reject(e)
            }

        })
        return promise2
    }
    catch(onRejected) {
    }
}

module.exports = Promise
