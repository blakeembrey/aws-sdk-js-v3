import { RedshiftClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RedshiftClient";
import { DeleteClusterSubnetGroupMessage } from "../models/index";
import {
  deserializeAws_queryDeleteClusterSubnetGroupCommand,
  serializeAws_queryDeleteClusterSubnetGroupCommand,
} from "../protocols/Aws_query";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type DeleteClusterSubnetGroupCommandInput = DeleteClusterSubnetGroupMessage;
export type DeleteClusterSubnetGroupCommandOutput = __MetadataBearer;

export class DeleteClusterSubnetGroupCommand extends $Command<
  DeleteClusterSubnetGroupCommandInput,
  DeleteClusterSubnetGroupCommandOutput,
  RedshiftClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteClusterSubnetGroupCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RedshiftClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DeleteClusterSubnetGroupCommandInput, DeleteClusterSubnetGroupCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const handlerExecutionContext: HandlerExecutionContext = {
      logger: {} as any,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DeleteClusterSubnetGroupCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_queryDeleteClusterSubnetGroupCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DeleteClusterSubnetGroupCommandOutput> {
    return deserializeAws_queryDeleteClusterSubnetGroupCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
