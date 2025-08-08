import {
  NT_COMMAND,
  NT_EVENT,
  NT_TIMEOUT,
  type Domain,
  type NodeDef,
} from "./types.ts";

export function downloadFile(filename: string, content: string): void {
  const fileObj = new File([content], filename, {
    endings: "native",
    type: "text/plain",
  });

  const url = window.URL.createObjectURL(fileObj);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  // Append to DOM for a moment
  document.body.appendChild(anchor);
  anchor.click();

  // Clean up
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 *
 * @param name string A raw element name, eg. "Foo Bar".
 * @param extension string A file extension to use. eg. "txt".
 * @returns string The filename built from parts. eg. "foobar.txt"
 */
export function safeFilename(name: string, extension: string): string {
  return `${name.toLowerCase().replaceAll(/[^a-z]/g, "")}.${extension}`;
}

export function safeFilenameGo(name: string): string {
  return safeFilename(name, "go");
}

export function safeFilenameProto(name: string): string {
  return safeFilename(name, "proto");
}

export function generateGoFileNodeDef(
  domain: Domain,
  nodeDef: NodeDef
): string {
  const packageName = safePackageNameGo(domain.name);

  if ([NT_COMMAND, NT_EVENT, NT_TIMEOUT].includes(nodeDef.type)) {
    return [
      generateGoMessageFileHeader(packageName),
      generateGoMessageStruct(nodeDef),
    ].join("\n");
  }

  // Unknown type
  return `package ${packageName}`;
}

export function generateProtoFileNodeDef(
  domain: Domain,
  nodeDef: NodeDef
): string {
  const packageName = safePackageNameProto(domain.name);

  return [
    generateProtoMessageFileHeader(packageName),
    generateProtoMessageStruct(nodeDef),
  ].join("\n");
}

// NOTE: new lines in string are important for formatting generated file.
function generateGoMessageFileHeader(packageName: string): string {
  return `package ${packageName}

import (
\t"errors"
\t"fmt"
\t"time"

\t"github.com/dogmatiq/dogma"
\t//"github.com/example-org/example-service/messages"
)
`;
}

// NOTE: new lines in string are important for formatting generated file.
function generateGoMessageStruct(nodeDef: NodeDef): string {
  const structName = safeStructNameGo(nodeDef.name);

  return `// ${structName} ${nodeDef.type} message.
type ${structName} struct {}

// MessageDescription returns a human-readable description of the message.
func (m ${structName}) MessageDescription() string {
\treturn "TODO: message description!"
}

// Validate returns a non-nil error if the message is invalid.
func (m ${structName}) Validate(dogma.${validationScopeType(nodeDef)}) error {
\treturn nil
}
`;
}

function generateProtoMessageFileHeader(packageName: string): string {
  return `syntax = "proto3";
package ${packageName};

//option go_package = "github.com/example-org/example-service/messages";
`;
}

// NOTE: new lines in string are important for formatting generated file.
function generateProtoMessageStruct(nodeDef: NodeDef): string {
  const structName = safeStructNameProto(nodeDef.name);

  return `// ${structName} ${nodeDef.type} message.
message ${structName} {}
`;
}

/**
 *
 * @param name string A raw element name, eg. "Foo Bar".
 * @returns string The safe package name for Go. "foobar"
 */
function safePackageNameGo(name: string): string {
  return name.toLowerCase().replaceAll(/[^a-z]/g, "");
}

/**
 *
 * @param name string A raw element name, eg. "Foo Bar".
 * @returns string The safe struct name for Go. "FooBar"
 */
function safeStructNameGo(name: string): string {
  return name.replaceAll(/[^a-zA-Z0-9]/g, "");
}

/**
 *
 * @param name string A raw element name, eg. "Foo Bar".
 * @returns string The safe package name for Protobuf. "foobar"
 */
function safePackageNameProto(name: string): string {
  return name.toLowerCase().replaceAll(/[^a-z]/g, "");
}

/**
 *
 * @param name string A raw element name, eg. "Foo Bar".
 * @returns string The safe struct name for Protobuf. "FooBar"
 */
function safeStructNameProto(name: string): string {
  return name.replaceAll(/[^a-zA-Z0-9]/g, "");
}

function validationScopeType(nodeDef: NodeDef): string {
  switch (nodeDef.type) {
    case NT_COMMAND:
      return "CommandValidationScope";
    case NT_EVENT:
      return "EventValidationScope";
    case NT_TIMEOUT:
      return "TimeoutValidationScope";
  }
  return "UnknownValidationScope";
}
