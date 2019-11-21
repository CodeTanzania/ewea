## EventType
`EventType` classify emergency events from the most generalised(nature and family) to the most specific (main event and peril).

### EventType Schema
`EventType` have the following attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

### Create EventType
To create a new event type, send a `POST` request to `https://api.ewea.io/v1/predefines/eventtypes`. The following attributes are supported:

<br/>

|Name|Type|Description|Required|
|:---:|:---:|:---:|:---:|
| code | String | Unique Human-readable given code of this event type. | false |
| name | Object | Human-translatable-readable name for the event type. | true |
| color |String | A color code(in hexadecimal format) used to differentiate event types visually. | false |

> Example Request

```curl
curl --request POST \ 
--url https://api.ewea.io/v1/predefines/eventtypes \ 
--header 'Accept: application/json' \ 
--header 'Content-Type: application/json' \ 
--header 'Authorization: Bearer <apiKey>' \ 
--data '{
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Retrieve EventType
To get a eventtype, send a `GET` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`. 

> Example Request

```curl
curl --request GET \ 
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \ 
--header 'Accept: application/json' \ 
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Update EventType
To update existing event type, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`. The following attributes are supported:

<br/>

|Name|Type|Description|Required|
|:---:|:---:|:---:|:---:|
| name | Object | Human-translatable-readable name for the event type. |

> Example Request

```curl
curl --request PATCH \ 
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \ 
--header 'Accept: application/json' \ 
--header 'Content-Type: application/json' \ 
--header 'Authorization: Bearer <apiKey>' \ 
--data '{
    "name": { "en": "Strong Winds" },
  }'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete EventType
To delete existing event type, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`.

> Example Request

```curl
curl --request DELETE \ 
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \ 
--header 'Accept: application/json' \ 
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All EventType
To list all event types, send a `GET` request to `https://api.ewea.io/v1/predefines/eventtypes`.

> Example Request

```curl
curl --request GET \ 
--url https://api.ewea.io/v1/predefines/eventtypes \ 
--header 'Accept: application/json' \ 
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event type with the standard event type attributes:

<br/>

|Name|Type|Description|
|:---:|:---:|:---:|
| _id | String | Unique universal identifier of this event type. |
| code | String | Unique Human-readable given code of this event type. |
| name | Object | Human-translatable-readable name for the event type. |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response:
```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95a",
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```
