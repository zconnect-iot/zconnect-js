import isFunction from 'lodash/isFunction'
import XDate from 'xdate'

export class ObjectId {
  constructor(oid) {
    this.oid = oid
  }
  toString() {
    return this.oid
  }
  serializeToEJSON() {
    return {
      $oid: this.oid,
    }
  }
  is(other) {
    return (typeof other === typeof this && this.oid === other.oid)
  }
}

export class UUID {
  constructor(uuid) {
    this.uuid = uuid
  }
  toString() {
    return this.uuid
  }
  serializeToEJSON() {
    return {
      $uuid: this.uuid,
    }
  }
  is(other) {
    return (typeof other === typeof this && this.uuid === other.uuid)
  }
}

export function displayDate(date) {
  if (date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '/')
  }
}

// Can be used for any object which don't have a serializeEJSON method on the
// prototype.
const typesToSerialize = {
  Date(data) {
    return {
      $date: (new XDate(data)).setUTCMode(true, true).getTime(),
    }
  },
  XDate(data) {
    return {
      $date: data.clone().setUTCMode(true, true).getTime(),
    }
  },
}

const deserializeMap = {
  $oid(data) {
    return new ObjectId(data.$oid)
  },
  // Comented out other bson transforms which may appear, but we cannot handle at present
  // $binary: function(val) {
  //   return bson.Binary(new Buffer(val.$binary, 'base64'), parseInt(val.$type, 16))
  // },
  // $ref: function(val) {
  //   let id = typeof val.$id === 'object'
  //   && deserialize[Object.keys(val.$id)[0]] ? deserialize[Object.keys(val.$id)[0]](val.$id)
  //     : val.$id
  //   return ObjectId(val.$ref, id)
  // },
  // $timestamp: function(val) {
  //   return bson.Timestamp(val.$timestamp.t, val.$timestamp.i)
  // },
  // $numberLong: function(val) {
  //   return bson.Long.fromString(val.$numberLong)
  // },
  // $maxKey: function() {
  //   return bson.MaxKey()
  // },
  // $minKey: function() {
  //   return bson.MinKey()
  // },
  $date(val) {
    let d = new XDate()
    // Kernel bug.  See #2 http://git.io/AEbmFg
    if (isNaN(d.setTime(val.$date))) {
      d = new XDate(val.$date)
    }

    return d
  },
  $regex(val) {
    return new RegExp(val.$regex, val.$options)
  },
  $undefined() {
    return undefined
  },
  $uuid(data) {
    return new UUID(data.$uuid)
  },
}

export function deserializeEJSON(data) {
  if (Array.isArray(data)) {
    return data.map(deserializeEJSON)
  }
  if (typeof data !== 'object') {
    return data
  }

  if (data === null) {
    return data
  }

  const keys = Object.keys(data)
  if (keys.length === 0) {
    return data
  }

  const caster = deserializeMap[keys[0]]
  if (!caster) {
    return keys.reduce((schema, key) => {
      // TODO: Remove when api returns id's as strings
      if (key === 'id') schema.id = data.id.toString()
      else schema[key] = deserializeEJSON(data[key])
      return schema
    }, {})
  }

  return caster(data)
}

export function serializeEJSON(data) {
  if (data) {
    if (Array.isArray(data)) {
      return data.map(serializeEJSON)
    }
    if (typeof data !== 'object') {
      return data
    }
    if (isFunction(data.serializeToEJSON)) {
      return data.serializeToEJSON()
    }

    for (const key in typesToSerialize) {
      if (GetInstanceType(data) === key) {
        return typesToSerialize[key](data)
      }
    }

    return Object.keys(data).reduce((acc, key) => {
      // TODO: Remove when api returns id's as strings
      if (key === 'id') acc.id = +data.id
      else acc[key] = serializeEJSON(data[key])
      return acc
    }, {})
  }
  return data
}

function GetInstanceType(obj) {
  const str = obj.constructor.toString()
  return str.substring(9, str.indexOf('('))
}
