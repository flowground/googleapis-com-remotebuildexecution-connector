# ![LOGO](logo.png) Remote Build Execution **flow**ground Connector

## Description

A generated **flow**ground connector for the Remote Build Execution API (version v2).

Generated from: https://api.apis.guru/v2/specs/googleapis.com/remotebuildexecution/v2/swagger.json<br/>
Generated at: 2019-05-23T12:13:35+03:00

## API Description

Supplies a Remote Execution API service for tools such as bazel.

## Authorization

Supported authorization schemes:
- OAuth2

For OAuth 2.0 you need to specify OAuth Client credentials as environment variables in the connector repository:
* `OAUTH_CLIENT_ID` - your OAuth client id
* `OAUTH_CLIENT_SECRET` - your OAuth client secret

## Actions

### Retrieve a cached execution result.<br/>
> <br/>
> Errors:<br/>
> <br/>
> * `NOT_FOUND`: The requested `ActionResult` is not in the cache.

*Tags:* `actionResults`

#### Input Parameters
* `hash` - _required_ - The hash. In the case of SHA-256, it will always be a lowercase hex string
exactly 64 characters long.
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `sizeBytes` - _required_ - The size of the blob, in bytes.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Upload a new execution result.<br/>
> <br/>
> In order to allow the server to perform access control based on the type of<br/>
> action, and to assist with client debugging, the client MUST first upload<br/>
> the Action that produced the<br/>
> result, along with its<br/>
> Command, into the<br/>
> `ContentAddressableStorage`.<br/>
> <br/>
> Errors:<br/>
> <br/>
> * `INVALID_ARGUMENT`: One or more arguments are invalid.<br/>
> * `FAILED_PRECONDITION`: One or more errors occurred in updating the<br/>
>   action result, such as a missing command or action.<br/>
> * `RESOURCE_EXHAUSTED`: There is insufficient storage space to add the<br/>
>   entry to the cache.

*Tags:* `actionResults`

#### Input Parameters
* `hash` - _required_ - The hash. In the case of SHA-256, it will always be a lowercase hex string
exactly 64 characters long.
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `resultsCachePolicy.priority` - _optional_ - The priority (relative importance) of this content in the overall cache.
Generally, a lower value means a longer retention time or other advantage,
but the interpretation of a given value is server-dependent. A priority of
0 means a *default* value, decided by the server.

The particular semantics of this field is up to the server. In particular,
every server will have their own supported range of priorities, and will
decide how these map into retention/eviction policy.
* `sizeBytes` - _required_ - The size of the blob, in bytes.
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Execute an action remotely.<br/>
> <br/>
> In order to execute an action, the client must first upload all of the<br/>
> inputs, the<br/>
> Command to run, and the<br/>
> Action into the<br/>
> ContentAddressableStorage.<br/>
> It then calls `Execute` with an `action_digest` referring to them. The<br/>
> server will run the action and eventually return the result.<br/>
> <br/>
> The input `Action`'s fields MUST meet the various canonicalization<br/>
> requirements specified in the documentation for their types so that it has<br/>
> the same digest as other logically equivalent `Action`s. The server MAY<br/>
> enforce the requirements and return errors if a non-canonical input is<br/>
> received. It MAY also proceed without verifying some or all of the<br/>
> requirements, such as for performance reasons. If the server does not<br/>
> verify the requirement, then it will treat the `Action` as distinct from<br/>
> another logically equivalent action if they hash differently.<br/>
> <br/>
> Returns a stream of<br/>
> google.longrunning.Operation messages<br/>
> describing the resulting execution, with eventual `response`<br/>
> ExecuteResponse. The<br/>
> `metadata` on the operation is of type<br/>
> ExecuteOperationMetadata.<br/>
> <br/>
> If the client remains connected after the first response is returned after<br/>
> the server, then updates are streamed as if the client had called<br/>
> WaitExecution<br/>
> until the execution completes or the request reaches an error. The<br/>
> operation can also be queried using Operations<br/>
> API.<br/>
> <br/>
> The server NEED NOT implement other methods or functionality of the<br/>
> Operations API.<br/>
> <br/>
> Errors discovered during creation of the `Operation` will be reported<br/>
> as gRPC Status errors, while errors that occurred while running the<br/>
> action will be reported in the `status` field of the `ExecuteResponse`. The<br/>
> server MUST NOT set the `error` field of the `Operation` proto.<br/>
> The possible errors include:<br/>
> <br/>
> * `INVALID_ARGUMENT`: One or more arguments are invalid.<br/>
> * `FAILED_PRECONDITION`: One or more errors occurred in setting up the<br/>
>   action requested, such as a missing input or command or no worker being<br/>
>   available. The client may be able to fix the errors and retry.<br/>
> * `RESOURCE_EXHAUSTED`: There is insufficient quota of some resource to run<br/>
>   the action.<br/>
> * `UNAVAILABLE`: Due to a transient condition, such as all workers being<br/>
>   occupied (and the server does not support a queue), the action could not<br/>
>   be started. The client should retry.<br/>
> * `INTERNAL`: An internal error occurred in the execution engine or the<br/>
>   worker.<br/>
> * `DEADLINE_EXCEEDED`: The execution timed out.<br/>
> * `CANCELLED`: The operation was cancelled by the client. This status is<br/>
>   only possible if the server implements the Operations API CancelOperation<br/>
>   method, and it was called for the current execution.<br/>
> <br/>
> In the case of a missing input or command, the server SHOULD additionally<br/>
> send a PreconditionFailure error detail<br/>
> where, for each requested blob not present in the CAS, there is a<br/>
> `Violation` with a `type` of `MISSING` and a `subject` of<br/>
> `"blobs/{hash}/{size}"` indicating the digest of the missing blob.

*Tags:* `actions`

#### Input Parameters
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Fetch the entire directory tree rooted at a node.<br/>
> <br/>
> This request must be targeted at a<br/>
> Directory stored in the<br/>
> ContentAddressableStorage<br/>
> (CAS). The server will enumerate the `Directory` tree recursively and<br/>
> return every node descended from the root.<br/>
> <br/>
> The GetTreeRequest.page_token parameter can be used to skip ahead in<br/>
> the stream (e.g. when retrying a partially completed and aborted request),<br/>
> by setting it to a value taken from GetTreeResponse.next_page_token of the<br/>
> last successfully processed GetTreeResponse).<br/>
> <br/>
> The exact traversal order is unspecified and, unless retrieving subsequent<br/>
> pages from an earlier request, is not guaranteed to be stable across<br/>
> multiple invocations of `GetTree`.<br/>
> <br/>
> If part of the tree is missing from the CAS, the server will return the<br/>
> portion present and omit the rest.<br/>
> <br/>
> * `NOT_FOUND`: The requested tree root is not present in the CAS.

*Tags:* `blobs`

#### Input Parameters
* `hash` - _required_ - The hash. In the case of SHA-256, it will always be a lowercase hex string
exactly 64 characters long.
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `pageSize` - _optional_ - A maximum page size to request. If present, the server will request no more
than this many items. Regardless of whether a page size is specified, the
server may place its own limit on the number of items to be returned and
require the client to retrieve more items using a subsequent request.
* `pageToken` - _optional_ - A page token, which must be a value received in a previous
GetTreeResponse.
If present, the server will use it to return the following page of results.
* `sizeBytes` - _required_ - The size of the blob, in bytes.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Download many blobs at once.<br/>
> <br/>
> The server may enforce a limit of the combined total size of blobs<br/>
> to be downloaded using this API. This limit may be obtained using the<br/>
> Capabilities API.<br/>
> Requests exceeding the limit should either be split into smaller<br/>
> chunks or downloaded using the<br/>
> ByteStream API, as appropriate.<br/>
> <br/>
> This request is equivalent to calling a Bytestream `Read` request<br/>
> on each individual blob, in parallel. The requests may succeed or fail<br/>
> independently.<br/>
> <br/>
> Errors:<br/>
> <br/>
> * `INVALID_ARGUMENT`: The client attempted to read more than the<br/>
>   server supported limit.<br/>
> <br/>
> Every error on individual read will be returned in the corresponding digest<br/>
> status.

*Tags:* `blobs`

#### Input Parameters
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Upload many blobs at once.<br/>
> <br/>
> The server may enforce a limit of the combined total size of blobs<br/>
> to be uploaded using this API. This limit may be obtained using the<br/>
> Capabilities API.<br/>
> Requests exceeding the limit should either be split into smaller<br/>
> chunks or uploaded using the<br/>
> ByteStream API, as appropriate.<br/>
> <br/>
> This request is equivalent to calling a Bytestream `Write` request<br/>
> on each individual blob, in parallel. The requests may succeed or fail<br/>
> independently.<br/>
> <br/>
> Errors:<br/>
> <br/>
> * `INVALID_ARGUMENT`: The client attempted to upload more than the<br/>
>   server supported limit.<br/>
> <br/>
> Individual requests may return the following errors, additionally:<br/>
> <br/>
> * `RESOURCE_EXHAUSTED`: There is insufficient disk quota to store the blob.<br/>
> * `INVALID_ARGUMENT`: The<br/>
> Digest does not match the<br/>
> provided data.

*Tags:* `blobs`

#### Input Parameters
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Determine if blobs are present in the CAS.<br/>
> <br/>
> Clients can use this API before uploading blobs to determine which ones are<br/>
> already present in the CAS and do not need to be uploaded again.<br/>
> <br/>
> There are no method-specific errors.

*Tags:* `blobs`

#### Input Parameters
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### GetCapabilities returns the server capabilities configuration.

*Tags:* `v2`

#### Input Parameters
* `instanceName` - _required_ - The instance of the execution system to operate against. A server may
support multiple instances of the execution system (with their own workers,
storage, caches, etc.). The server MAY require use of this field to select
between them in an implementation-defined fashion, otherwise it can be
omitted.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

### Wait for an execution operation to complete. When the client initially<br/>
> makes the request, the server immediately responds with the current status<br/>
> of the execution. The server will leave the request stream open until the<br/>
> operation completes, and then respond with the completed operation. The<br/>
> server MAY choose to stream additional updates as execution progresses,<br/>
> such as to provide an update as to the state of the execution.

*Tags:* `operations`

#### Input Parameters
* `name` - _required_ - The name of the Operation
returned by Execute.
* `access_token` - _optional_ - OAuth access token.
* `alt` - _optional_ - Data format for response.
    Possible values: json, media, proto.
* `callback` - _optional_ - JSONP
* `fields` - _optional_ - Selector specifying which fields to include in a partial response.
* `key` - _optional_ - API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
* `oauth_token` - _optional_ - OAuth 2.0 token for the current user.
* `prettyPrint` - _optional_ - Returns response with indentations and line breaks.
* `quotaUser` - _optional_ - Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
* `uploadType` - _optional_ - Legacy upload protocol for media (e.g. "media", "multipart").
* `upload_protocol` - _optional_ - Upload protocol for media (e.g. "raw", "multipart").

## License

**flow**ground :- Telekom iPaaS / googleapis-com-remotebuildexecution-connector<br/>
Copyright © 2019, [Deutsche Telekom AG](https://www.telekom.de)<br/>
contact: flowground@telekom.de

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
