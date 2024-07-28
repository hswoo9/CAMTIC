package egovframework.com.devjitsu.inside.document.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentServiceImpl implements DocumentService {



    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private PayAppRepository payAppRepository;

    @Override
    public List<Map<String, Object>> getDocumentList(Map<String, Object> params){
        List<Map<String, Object>> result = new ArrayList<>();
        result = documentRepository.getDocumentList(params);

        return result;
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
    public Map<String, Object> getDocuContractOne(Map<String, Object> params){
        return documentRepository.getDocuContractOne(params);
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
        cell.setCellValue("이름");
        cell = row.createCell(6);
        cell.setCellValue("주문처");
        cell = row.createCell(7);
        cell.setCellValue("금액");
        cell = row.createCell(8);
        cell.setCellValue("결제구분");
        cell = row.createCell(9);
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
                cell.setCellValue("");
                cell = row.createCell(6);
                cell.setCellValue("합계");
                cell = row.createCell(7);
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
            cell.setCellValue(map.get("EMP_NAME").toString());
            cell = row.createCell(6);
            cell.setCellValue("-");
            cell = row.createCell(7);
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
        cell.setCellValue("");
        cell = row.createCell(6);
        cell.setCellValue("합계");
        cell = row.createCell(7);
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
    public void setInComeInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        documentRepository.setInComeInsert(params);

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("documentSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

    }

    @Override
    public void setDocuOrderInsert(Map<String, Object> params) {
        documentRepository.setDocuOrderInsert(params);
    }

    @Override
    public void setDocuContractInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        try{
            if(!params.containsKey("documentContractSn")){
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
            }else{
                documentRepository.setDocuContractUpd(params);
            }

            if(file.length > 0){
                MainLib mainLib = new MainLib();
                List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
                for(int i = 0 ; i < list.size() ; i++){
                    list.get(i).put("contentId", params.get("documentContractSn"));
                    list.get(i).put("empSeq", params.get("empSeq"));
                    list.get(i).put("fileCd", params.get("menuCd"));
                    list.get(i).put("filePath", filePath(params, base_dir));
                    list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                    list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
                }
                commonRepository.insFileInfo(list);
            }
        }catch (Exception e){
            System.out.println(e);
        }

    }

    @Override
    public void setSnackInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        Gson gson = new Gson();
        List<Map<String, Object>> amt = gson.fromJson((String) params.get("amtUser"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(params.containsKey("snackInfoSn")){
            documentRepository.setSnackUpdate(params);
        } else {
            documentRepository.setSnackInsert(params);
        }

        if(!amt.isEmpty()) {
            params.put("amt", amt);
            documentRepository.setSnackCompanionInsert(params);
        }

        if(params.get("payType").equals("2")) {
            List<Map<String, Object>> cardArr = gson.fromJson((String) params.get("cardArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

            for(Map<String, Object> map : cardArr){
                map.put("snackInfoSn", "snack_" + params.get("snackInfoSn"));

                commonRepository.updFileOwnerCustom(map);
            }
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("snackInfoSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(params.containsKey("cardArr")){
            documentRepository.delCardHist(params);
            documentRepository.delSnackUseCardInfo(params);
            List<Map<String, Object>> list = gson.fromJson((String) params.get("cardArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            for(Map<String, Object> data : list){
                data.put("snackInfoSn", params.get("snackInfoSn"));
                data.put("AUTH_NO", data.get("authNum"));
                data.put("AUTH_HH", data.get("authTime"));
                data.put("AUTH_DD", data.get("authDate"));
                data.put("CARD_NO", params.get("cardSn"));
                data.put("BUY_STS", data.get("buySts"));
                data.put("SNACK_INFO_SN", data.get("snackInfoSn"));
                payAppRepository.insUseCardInfo(data);
                documentRepository.insCardHist(data);
            }
        }

        if(params.containsKey("cardToSn")){
            params.put("payAppSn", params.get("snackInfoSn"));
            payAppRepository.updCardToPayApp(params);
        }
    }

    @Override
    public void setSnackDel(Map<String, Object> params) {
        documentRepository.setSnackDel(params);
        documentRepository.delCardHist(params);
        documentRepository.delSnackUseCardInfo(params);
    }

    @Override
    public void setSnackReqCert(Map<String, Object> params) {
        documentRepository.setSnackReqCert(params);
    }

    @Override
    public void setArchiveInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        documentRepository.setArchiveInsert(params);

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("archiveInfoSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    //문서고 등록 - 문서위치 조회
    @Override
    public List<Map<String,Object>> getDocumentPlaceList(Map<String, Object> params) {
        return documentRepository.getDocumentPlaceList(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    //문서고 삭제
    @Override
    public Map<String, Object> setAchiveDelete(List<String> archivePk) {
        Map<String, Object> result = new HashMap<>();

        try {
            documentRepository.setAchiveDelete(archivePk);

            result.put("code", "200");
            result.put("message", "삭제가 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    //문서고 폐기
    @Override
    public Map<String, Object> setAchiveScrap(List<String> archivePk) {
        Map<String, Object> result = new HashMap<>();

        try {
            documentRepository.setAchiveScrap(archivePk);

            result.put("code", "200");
            result.put("message", "폐기가 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "폐기 중 에러가 발생했습니다.");
        }

        return result;
    }

    //문서고 업데이트
    @Override
    public Map<String, Object> setArchiveUpdate(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        Map<String, Object> result = new HashMap<>();

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("pk"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        try {
            documentRepository.setArchiveUpdate(params);

            result.put("code", "200");
            result.put("message", "수정이 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "수정 중 에러가 발생했습니다.");
        }

        return result;
    }

    //문서고 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getArchiveinfoList(Map<String, Object> params) {
        return documentRepository.getArchiveinfoList(params);
    }
    
    //등록대장, 접수대장 임시 삭제
    @Override
    public void delDocumentList(Map<String, Object> params) {
        documentRepository.delDocumentList(params);
    }

    //등록대장, 접수대장 삭제 복구
    @Override
    public void delCancelDocumentList(Map<String, Object> params) {
        documentRepository.delCancelDocumentList(params);
    }

    //등록대장, 접수대장 최종 삭제
    @Override
    public void delFinalDocumentList(Map<String, Object> params) {
        documentRepository.delFinalDocumentList(params);
    }

    // 등록대장 문서 삭제
    @Override
    public void setRlDelete(Map<String, Object> params) {
        documentRepository.setRlDelete(params);
    }

    // 등록대장 문서Pop
    @Override
    public Map<String, Object> getDocViewOne(Map<String, Object> params) {
        return documentRepository.getDocViewOne(params);
    }

    // 등록대장 문서 수정
    @Override
    public void setDocumentUpdate(Map<String, Object> params) {documentRepository.setDocumentUpdate(params);}
    
    // 접수대장 팝업 조회
    @Override
    public Map<String, Object> getInComeUpdateList(Map<String, Object> params) {
        return documentRepository.getInComeUpdateList(params);
    }

    // 접수대장 팝업 수정
    @Override
    public Map<String, Object> setInComeUpdate(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        Map<String, Object> result = new HashMap<>();

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("documentSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        try {
            documentRepository.setInComeUpdate(params);
            result.put("message", "수정이 완료되었습니다.");

        }catch (Exception e){
            result.put("message", "수정 중 에러가 발생했습니다.");
        }

        return result;
    }

/*
    @Override
    public List<Map<String, Object>> getInComeUpdateFileList(Map<String, Object> params) {
        return documentRepository.getInComeUpdateFileList(params);
    }
*/

    @Override
    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        List<Map<String, Object>> resultMap = documentRepository.getCardList(params);

        if(!resultMap.isEmpty()){
            String[] fileNoArr = resultMap.get(0).get("FR_FILE_NO").toString().split(",");

            for(int i = 0 ; i < fileNoArr.length ; i++){
                resultMap.get(i).put("fileNo", fileNoArr[i]);
            }
        }

        return resultMap;
    }
    @Override
    public List<Map<String, Object>> getFileListC(Map<String, Object> params) {
        return documentRepository.getFileListC(params);
    }
    @Override
    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        return documentRepository.getFileList(params);
    }

    @Override
    public void updateInComeDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("documentSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            documentRepository.updateInComeApprStat(params);
        }else if("20".equals(docSts)) { // 중간결재
            documentRepository.updateInComeApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            documentRepository.updateInComeApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            documentRepository.updateInComeFinalApprStat(params);
        }else if("111".equals(docSts)){ // 임시저장
            documentRepository.updateInComeApprStat(params);
        }

        if("10".equals(docSts) || "50".equals(docSts)){
            /** STEP1. pjtSn 으로 delvData 호출 */
            params.put("contentId", approKey);
            params.put("fileCd", "inCome");
            List<Map<String, Object>> fileList = commonRepository.getFileList(params);

            if(fileList.size() > 0){
                for(Map<String, Object> data : fileList){
                    data.put("docId", params.get("docId"));
                    documentRepository.setIncomeFileDocNm(data);
                }
            }
        }
    }
}
