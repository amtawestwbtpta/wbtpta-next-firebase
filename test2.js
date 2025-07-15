<PDFDownloadLink
  document={
    <BenefitProforma data={benefitData} year={parseInt(selectedYear)} />
  }
  fileName={`Benefit Proforma of Teachers.pdf`}
  style={{
    textDecoration: "none",
    padding: 11,
    color: "#fff",
    backgroundColor: "darkgreen",
    border: "1px solid #4a4a4a",
    width: "40%",
    borderRadius: 10,
    margin: 20,
  }}
>
  {({ blob, url, loading, error }) =>
    loading ? "Please Wait..." : "Download Form"
  }
</PDFDownloadLink>;
