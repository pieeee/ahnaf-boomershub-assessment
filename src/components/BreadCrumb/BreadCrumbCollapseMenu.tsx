import { Menu, MenuItem } from "@szhsin/react-menu";
import styles from "@app/styles/components/breadcrumb.module.scss";
import { IDocument } from "@app/lib/stores/useDriveStore";
import { useRouter } from "next/router";
import { BsThreeDots } from "react-icons/bs";
import { FiHardDrive } from "react-icons/fi";
import { BiFile } from "react-icons/Bi";
import { HiFolder } from "react-icons/hi";

const BreadCrumbCollapseMenu: React.FC<{ documets: IDocument[] }> = ({
  documets,
}) => {
  const router = useRouter();

  return (
    <Menu
      menuButton={
        <button className={styles["breadcrumb__collapse"]}>
          <BsThreeDots />
        </button>
      }
      transition
    >
      <MenuItem className="menu-item" onClick={() => router.push("/")}>
        <FiHardDrive className="menu-item-icon" />
        My Drive
      </MenuItem>
      {documets.map((doc) => (
        <MenuItem
          onClick={() => router.push(`/${doc.type}/${doc.id}`)}
          className="menu-item"
          key={doc.id}
        >
          {doc.type === "file" ? (
            <BiFile className="menu-item-icon" />
          ) : (
            <HiFolder className="menu-item-icon" />
          )}
          <span>{doc.name}</span>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BreadCrumbCollapseMenu;
