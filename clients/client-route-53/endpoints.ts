import { RegionInfo, RegionInfoProvider } from "@aws-sdk/types";

// Partition default templates
const AWS_TEMPLATE = "route53.{region}.amazonaws.com";
const AWS_CN_TEMPLATE = "route53.{region}.amazonaws.com.cn";
const AWS_ISO_TEMPLATE = "route53.{region}.c2s.ic.gov";
const AWS_ISO_B_TEMPLATE = "route53.{region}.sc2s.sgov.gov";
const AWS_US_GOV_TEMPLATE = "route53.{region}.amazonaws.com";

// Partition regions
const AWS_REGIONS = new Set([
  "ap-south-1",
  "eu-north-1",
  "eu-west-3",
  "eu-west-2",
  "eu-west-1",
  "ap-northeast-2",
  "ap-northeast-1",
  "me-south-1",
  "ca-central-1",
  "sa-east-1",
  "ap-east-1",
  "ap-southeast-1",
  "ap-southeast-2",
  "eu-central-1",
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
]);
const AWS_CN_REGIONS = new Set(["cn-north-1", "cn-northwest-1"]);
const AWS_ISO_REGIONS = new Set(["us-iso-east-1"]);
const AWS_ISO_B_REGIONS = new Set(["us-isob-east-1"]);
const AWS_US_GOV_REGIONS = new Set(["us-gov-west-1", "us-gov-east-1"]);

export const defaultRegionInfoProvider: RegionInfoProvider = (region: string, options?: any) => {
  let regionInfo: RegionInfo | undefined = undefined;
  switch (region) {
    // First, try to match exact region names.
    case "aws-global":
      regionInfo = {
        hostname: "route53.amazonaws.com",
        signingRegion: "us-east-1",
      };
      break;
    case "aws-iso-global":
      regionInfo = {
        hostname: "route53.c2s.ic.gov",
        signingRegion: "us-iso-east-1",
      };
      break;
    case "aws-us-gov-global":
      regionInfo = {
        hostname: "route53.us-gov.amazonaws.com",
        signingRegion: "us-gov-west-1",
      };
      break;
    // Next, try to match partition endpoints.
    default:
      if (AWS_REGIONS.has(region)) {
        return defaultRegionInfoProvider("aws-global");
      }
      if (AWS_CN_REGIONS.has(region)) {
        regionInfo = {
          hostname: AWS_CN_TEMPLATE.replace("{region}", region),
        };
      }
      if (AWS_ISO_REGIONS.has(region)) {
        return defaultRegionInfoProvider("aws-iso-global");
      }
      if (AWS_ISO_B_REGIONS.has(region)) {
        regionInfo = {
          hostname: AWS_ISO_B_TEMPLATE.replace("{region}", region),
        };
      }
      if (AWS_US_GOV_REGIONS.has(region)) {
        return defaultRegionInfoProvider("aws-us-gov-global");
      }
      // Finally, assume it's an AWS partition endpoint.
      if (regionInfo === undefined) {
        return defaultRegionInfoProvider("aws-global");
      }
  }
  return Promise.resolve(regionInfo);
};
