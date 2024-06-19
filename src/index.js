/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import ResultPage from "views/examples/ResultPage.js";
import ResultPageFromList from "views/examples/ResultPageFromList.js";
import AssessmentPage from "views/examples/AssessmentPage.js";
import ListResultsPage from "views/examples/ListResultsPage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/components" element={<Index />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/result/:id" element={<ResultPageFromList />} />
      <Route path="/fill-assessment" element={<AssessmentPage />} />
      <Route path="/view-all-result" element={<ListResultsPage />} />
      <Route path="*" element={<Navigate to="/components" replace />} />
    </Routes>
  </BrowserRouter>
);
