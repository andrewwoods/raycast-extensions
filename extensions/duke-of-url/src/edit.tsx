import { Action, ActionPanel, Clipboard, Form, LaunchProps, showToast, Toast } from "@raycast/api";

import { makePageUrl } from "./url";
import { useForm } from "@raycast/utils";
import type { JSX } from "react";

interface FormValues {
  [key: string]: string;
}

export default function Command(props: LaunchProps<{ arguments: Arguments.Edit }>) {
  const { longUrl } = props.arguments;

  const url = new URL(longUrl);

  const paramsList: JSX.Element[] = [];
  url.searchParams.forEach((value, key) => {
    const fieldTitle = key.toUpperCase();
    paramsList.push(<Form.TextField key={key} id={key} title={fieldTitle} defaultValue={value} />);
  });

  const { handleSubmit } = useForm<FormValues>({
    onSubmit(values) {
      const queryParams = new URLSearchParams();
      for (const key in values) {
        values[key] = values[key].trim();
        if (values[key] == "-" || values[key] == "") {
          continue;
        }
        queryParams.append(key, values[key]);
      }
      const pageUrl = makePageUrl(url);
      const updatedUrl = pageUrl.toString() + "?" + queryParams.toString();
      Clipboard.copy(updatedUrl);

      showToast({
        style: Toast.Style.Success,
        title: "Yay!",
        message: `Copied Update URL ${updatedUrl} to clipboard`,
      });
    },
  });
  return (
    <Form
      navigationTitle="Edit Query Parameters"
      actions={
        <ActionPanel title="Duke of URL | Query Parameters">
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      {paramsList}
    </Form>
  );
}
