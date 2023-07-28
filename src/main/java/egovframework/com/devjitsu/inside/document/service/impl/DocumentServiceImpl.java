package egovframework.com.devjitsu.inside.document.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.common.utiles.ConvertUtil;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.inside.document.repository.DocumentRepository;
import egovframework.com.devjitsu.inside.document.service.DocumentService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentServiceImpl implements DocumentService {



    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Map<String, Object>> getDocumentList(Map<String, Object> params){
        return documentRepository.getDocumentList(params);
    }

    @Override
    public List<Map<String, Object>> getDocuOrderList(Map<String, Object> params){
        return documentRepository.getDocuOrderList(params);
    }

    @Override
    public List<Map<String, Object>> getDocuContractList(Map<String, Object> params){
        return documentRepository.getDocuContractList(params);
    }

    @Override
    public List<Map<String, Object>> getSnackList(Map<String, Object> params){
        return documentRepository.getSnackList(params);
    }

    @Override
    public Map<String, Object> getSnackOne(Map<String, Object> params){
        return documentRepository.getSnackOne(params);
    }

    @Override
    public Map<String, Object> getSnackStat(Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("dept", documentRepository.getSnackStatDept(params));
        result.put("total", documentRepository.getSnackStat(params));
        return result;
    }

    @Override
    public void snackListDownload(Map<String, Object> params, HttpServletResponse response) throws IOException {
        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("test");
        Row row = null;
        Cell cell = null;
        int rowNum = 0;

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue("NO");
        cell = row.createCell(1);
        cell.setCellValue("일시");
        cell = row.createCell(2);
        cell.setCellValue("식대구분");
        cell = row.createCell(3);
        cell.setCellValue("부서");
        cell = row.createCell(4);
        cell.setCellValue("팀");
        cell = row.createCell(5);
        cell.setCellValue("주문처");
        cell = row.createCell(6);
        cell.setCellValue("금액");
        cell = row.createCell(7);
        cell.setCellValue("결제구분");
        cell = row.createCell(8);
        cell.setCellValue("수령자");

        List<Map<String, Object>> list = documentRepository.getSnackExcelList(params);

        String snackType = "";
        String snackDept = "";
        String snackTeam = "";
        int sum = 0;

        for (Map<String, Object> map : list) {
            if(rowNum != 1 && (!snackType.equals(map.get("SNACK_TYPE_TEXT").toString()) || !snackDept.equals(map.get("REG_DEPT_NAME").toString()) || !snackTeam.equals(map.get("REG_TEAM_NAME").toString()))) {
                row = sheet.createRow(rowNum++);
                cell = row.createCell(0);
                cell.setCellValue("");
                cell = row.createCell(1);
                cell.setCellValue("");
                cell = row.createCell(2);
                cell.setCellValue("");
                cell = row.createCell(3);
                cell.setCellValue("");
                cell = row.createCell(4);
                cell.setCellValue("");
                cell = row.createCell(5);
                cell.setCellValue("합계");
                cell = row.createCell(6);
                cell.setCellValue(sum);
                sum = 0;
            }

            row = sheet.createRow(rowNum++);
            cell = row.createCell(0);
            cell.setCellValue("");
            cell = row.createCell(1);
            cell.setCellValue(map.get("USE_DT").toString());
            cell = row.createCell(2);
            cell.setCellValue(map.get("SNACK_TYPE_TEXT").toString());
            cell = row.createCell(3);
            cell.setCellValue(map.get("REG_DEPT_NAME").toString());
            cell = row.createCell(4);
            cell.setCellValue(map.get("REG_TEAM_NAME").toString());
            cell = row.createCell(5);
            cell.setCellValue("-");
            cell = row.createCell(6);
            cell.setCellValue(Integer.parseInt(map.get("AMOUNT_SN").toString()));

            sum += Integer.parseInt(map.get("AMOUNT_SN").toString());
            snackType = map.get("SNACK_TYPE_TEXT").toString();
            snackDept = map.get("REG_DEPT_NAME").toString();
            snackTeam = map.get("REG_TEAM_NAME").toString();
        }

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue("");
        cell = row.createCell(1);
        cell.setCellValue("");
        cell = row.createCell(2);
        cell.setCellValue("");
        cell = row.createCell(3);
        cell.setCellValue("");
        cell = row.createCell(4);
        cell.setCellValue("");
        cell = row.createCell(5);
        cell.setCellValue("합계");
        cell = row.createCell(6);
        cell.setCellValue(sum);

        for(int i = 0 ; i < list.size() ; i++){
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, (sheet.getColumnWidth(i))+1656); //너비 더 넓게
        }

        response.setContentType("ms-vnd/excel");
        String fileName = "식대대장.xlsx";
        String outputFileName = new String(fileName.getBytes("KSC5601"), "8859_1");
        response.setHeader("Content-Disposition", "attachment;filename=\"" + outputFileName + "\"");

        wb.write(response.getOutputStream());
        wb.close();
    }

    @Override
    public List<Map<String, Object>> getArchiveList(Map<String, Object> params){
        return documentRepository.getArchiveList(params);
    }

    @Override
    public void setDocumentInsert(Map<String, Object> params) {
        documentRepository.setDocumentInsert(params);
    }

    @Override
    public void setDocuOrderInsert(Map<String, Object> params) {
        documentRepository.setDocuOrderInsert(params);
    }

    @Override
    public void setDocuContractInsert(Map<String, Object> params, String base_dir) {
        try{
            documentRepository.setDocuContractInsert(params);
            //
            Gson gson = new Gson();
            List<Map<String, Object>> area = gson.fromJson((String) params.get("productArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            if(!area.isEmpty()) {
                params.put("area", area);
                documentRepository.setProductInsert(params);
            }
            ConvertUtil convertUtil = new ConvertUtil();
            Map<String, Object> fileSaveMap = new HashMap<>();
            fileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docFileStr")), "hwp", params, base_dir, "");
            fileSaveMap.put("frKey", params.get("documentContractSn"));
            documentRepository.insOneFileInfo(fileSaveMap);
            params.put("fileNo", fileSaveMap.get("fileNo"));
            documentRepository.setDocuContractFileKey(params);
        }catch (Exception e){
            System.out.println(e);
        }

    }

    @Override
    public void setSnackInsert(Map<String, Object> params) {
        documentRepository.setSnackInsert(params);
    }

    @Override
    public void setSnackReqCert(Map<String, Object> params) {
        documentRepository.setSnackReqCert(params);
    }

    @Override
    public void setArchiveInsert(Map<String, Object> params) {
        documentRepository.setArchiveInsert(params);
    }

    //문서고 등록 - 문서위치 조회
    @Override
    public List<Map<String,Object>> getDocumentPlaceList(Map<String, Object> params) {
        return documentRepository.getDocumentPlaceList(params);
    }
}
