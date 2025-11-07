import { Action, ActionPanel, List, Row, showToast, Toast } from "@raycast/api";
import { useCallback, useState } from "react";

import { makePageUrl, makeSiteUrl } from "./url.tsx";

/**
 * Test URLs
 *
 * 1. HTML Page
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 *
 * https://react.dev/reference/react/useState
 * https://developers.raycast.com/utilities/react-hooks/usecachedstate
 *
 *
 */
export default function Command() {
  const [inputText, setInputText] = useState("");

  const handleParse = useCallback(() => {
    if (!isValid(inputText)) {
      showToast({ title: "The URL is not valid!", style: Toast.Style.Failure });
      return;
    }
  }, [inputText]);

  const url = inputText && isValid(inputText) ? new URL(inputText) : null;
  const siteUrl = url ? makeSiteUrl(url) : "";
  const pageUrl = url ? makePageUrl(url) : "";

  return (
    <List
      filtering={false}
      searchText={inputText}
      onSearchTextChange={setInputText}
      navigationTitle="Extract URL Parts"
      searchBarPlaceholder="Enter a URL"
    >
      {!url ? (
        <List.EmptyView
          description={inputText ? `Press Enter to parse ${inputText}` : `Input URL to parse.`}
          actions={
            <ActionPanel>
              <Action title="Parse URL" onAction={handleParse} />
            </ActionPanel>
          }
        />
      ) : (
        <List.Section title="Results">
          <Row label="Site URL" desc="Root of the website" value={siteUrl.toString()} />
          <Row label="Page URL" desc="Single page URL" value={pageUrl.toString()} />
        </List.Section>
      )}
    </List>
  );
}

function Row(props: { label: string; desc: string; value: string }) {
  const { label, desc, value } = props;

  return (
    <List.Item
      title={label}
      subtitle={desc}
      accessories={[{ text: value }]}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title={"Copy " + label} content={value} />
        </ActionPanel>
      }
    />
  );
}

function isValid(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
