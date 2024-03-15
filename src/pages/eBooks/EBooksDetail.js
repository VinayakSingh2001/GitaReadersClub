import React, { useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const data = {
  id: "root",
  label: "Root",
  children: [
    {
      id: "applications",
      label: "Applications",
      children: [
        {
          id: "calendar",
          label: "Calendar",
          data: "Hey, This is Calendar",
        },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      children: [
        {
          id: "oss",
          label: "OSS",
          data: "Hey, this is OSS",
        },
        {
          id: "mui",
          label: "MUI",
          children: [
            {
              id: "index.js",
              label: "index.js",
            },
          ],
        },
      ],
    },
  ],
};

const EBooksDetail = () => {
  const [fileContent, setFileContent] = useState("");

  const handleNodeClick = (node) => {
    if (!node.children) {
      setFileContent(node.data);
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.label}
      onClick={() => handleNodeClick(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div className="flex py-10 px-10">
      <div className="w-[20%] bg-slate-400 p-5">
        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(data)}
          </TreeView>
        </Box>
      </div>
      <div className="w-[80%] bg-slate-200">
        <p className="p-10">{fileContent}</p>
      </div>
    </div>
  );
};

export default EBooksDetail;
