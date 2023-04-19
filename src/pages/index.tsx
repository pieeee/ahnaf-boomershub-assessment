import BreadCrumb from "@app/components/BreadCrumb/BreadCrumb";
import {
  selectRootDocuments,
  useDriveStore,
} from "@app/lib/stores/useDriveStore";
import dynamic from "next/dynamic";
const Documents = dynamic(() => import("@app/components/Documents"), {
  ssr: false,
});

export default function Home() {
  const folders = useDriveStore(selectRootDocuments("folder"));
  const files = useDriveStore(selectRootDocuments("file"));

  return (
    <div>
      <BreadCrumb />
      <Documents documents={folders} type="folder" />
      <Documents documents={files} type="file" />
    </div>
  );
}
