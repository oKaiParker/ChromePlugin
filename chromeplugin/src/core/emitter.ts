// import { Emitter } from '@/core/emitter'
// class StreamInfoMgr extends EntEmitter 
// this.emitAsync(cmdstring, data)
// streamInfoMgr.on(
//     cmdstring,
//     this.onSigUpdateViewport.bind(this)
//   )

export class Listener {
    emitter: Emitter | undefined = undefined
    type = ''
    listener: Function | undefined = undefined

    off() {
        if (this.emitter && this.type && this.listener) {
            this.emitter.off(this.type, this.listener)
        }
    }
}

export class Emitter {
    private _events: Record<string, Function | Function[]> = {}

    on(type: string, listener: Function, prepend = false): Listener {
        if (!this._events[type]) {
            this._events[type] = listener
        } else {
            if (typeof this._events[type] === 'function') {
                this._events[type] = [this._events[type] as Function]
            }

            if (prepend) {
                ; (this._events[type] as Function[]).unshift(listener)
            } else {
                ; (this._events[type] as Function[]).push(listener)
            }
        }
        const retValue = new Listener()
        retValue.emitter = this
        retValue.type = type
        retValue.listener = listener

        return retValue
    }

    off(type: string, listener: Function) {
        if (!this._events[type]) {
            return
        }

        const handler = this._events[type]
        if (Array.isArray(handler)) {
            let position = -1
            for (let i = 0, length = handler.length; i < length; i++) {
                if (handler[i] === listener) {
                    position = i
                    break
                }
            }
            if (position >= 0) {
                ; (this._events[type] as Function[]).splice(position, 1)
            }
            if (handler.length === 0) {
                delete this._events[type]
            }
        } else if (handler === listener) {
            delete this._events[type]
        }
    }

    clear(listener: Function) {
        for (const key in this._events) {
            this.off(key, listener)
        }
    }

    emit(type: string, ...args: any[]) {
        const handler = this._events[type]
        if (typeof handler === 'function') {
            handler.apply(this, args)
            return
        }
        if (Array.isArray(handler)) {
            for (let i = 0, l = handler.length; i < l; i++) {
                if (typeof handler[i] !== 'function') {
                    handler.splice(i, 0)
                    break
                }
                handler[i].apply(this, args)
            }
        }
    }

    emitAsync(type: string, ...args: any[]) {
        const promises: Promise<void>[] = []
        const handler = this._events[type]
        if (typeof handler === 'function') {
            promises.push(handler.apply(this, args))
        } else if (Array.isArray(handler)) {
            for (let i = 0, l = handler.length; i < l; i++) {
                if (typeof handler[i] !== 'function') {
                    handler.splice(i, 0)
                    break
                }
                promises.push(handler[i].apply(this, args))
            }
        }

        return Promise.all(promises)
    }
}
