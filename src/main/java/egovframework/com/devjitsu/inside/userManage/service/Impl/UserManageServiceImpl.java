package egovframework.com.devjitsu.inside.userManage.service.Impl;

import com.google.common.hash.Hashing;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UserManageServiceImpl implements UserManageService {
    @Autowired
    private UserManageRepository userManageRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public Map<String, Object> getUserPersonnelRecordList(Map<String, Object> map) {
        return userManageRepository.getUserPersonnelRecordList(map);
    }
    @Override
    public List<Map<String,Object>> getEducationalList (Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getEducationalList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("GRADE_NO"));
                resultList.get(i).put("gradeFile", commonRepository.getContentFileOne(searchMap));
                searchMap.put("fileNo", resultList.get(i).get("SCORE_NO"));
                resultList.get(i).put("socreFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String, Object>> getCareerInfoList(Map<String, Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getCareerInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("ADD_NO"));
                resultList.get(i).put("addFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String,Object>> getFamilyInfoList(Map<String,Object> map) {
        return userManageRepository.getFamilyInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getLicenceInfoList(Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getLicenceInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("CERTIFICATE_ADD_NO"));
                resultList.get(i).put("certificateAddFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String,Object>> getAppointInfoList (Map<String,Object> map) {
        return userManageRepository.getAppointInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getRewardInfoList (Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getRewardInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("REWARD_ADD_NO"));
                resultList.get(i).put("rewardAddFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public Map<String, Object> getMilitarySvcInfo(Map<String, Object> map) {
        return userManageRepository.getMilitarySvcInfo(map);
    }

    @Override
    public Map<String, Object> getMilitaryInfo(Map<String, Object> params) {
        return userManageRepository.getMilitaryInfo(params);
    }

    @Override
    public List<Map<String,Object>> getDeptCodeList2 (Map<String,Object> params) {
        return userManageRepository.getDeptCodeList2(params);
    }

    @Override
    public List<Map<String,Object>> getDeptCodeList (Map<String,Object> params) {
        return userManageRepository.getDeptCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getAllUserPersonnelRecordList(Map<String, Object> map) {
        return userManageRepository.getAllUserPersonnelRecordList(map);
    }
    @Override
    public List<Map<String,Object>> getCodeList() {
        return userManageRepository.getCodeList();
    }
    @Override
    public List<Map<String, Object>> getEmpInfoList(Map<String, Object> map) {

        if(map.containsKey("arr") && !"".equals(map.get("arr").toString())){
            String arrText = map.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            map.put("arr", arr);
        }

        return userManageRepository.getEmpInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getEmpInfoDetailList(Map<String,Object> map) {

        if(map.get("searchDetail6") != null){
            String[] ar = map.get("searchDetail6").toString().replace("'", "").split(",");
            map.put("sd6_flag", ar.length);

            if(ar.length > 1){
                map.put("searchDetail6_1", ar[0]);
                map.put("searchDetail6_2", ar[1]);
            }
        }

        return userManageRepository.getEmpInfoDetailList(map);
    }
    @Override
    public List<Map<String,Object>> getDutyInfoList(Map<String,Object> map) {
        return userManageRepository.getDutyInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getProposalInfoList(Map<String,Object> map) {
        return userManageRepository.getProposalInfoList(map);
    }

    @Override
    public Map<String, Object> getStudyInfoList(Map<String, Object> map) {
        return userManageRepository.getStudyInfoList(map);
    }

    @Override
    public void setBasicInfo(Map<String, Object> params) {
        userManageRepository.setBasicInfo(params);
    }

    @Override
    public void setUserReqDetailInsert(Map<String, Object> params) {

        if(params.get("division").equals("0") || (params.get("division").equals("4") && params.get("divisionSub").equals("1")) ||   // 정규직원, 계약직원8
            (params.get("division").equals("4") && params.get("divisionSub").equals("2")) || (params.get("division").equals("1") && params.get("divisionSub").equals("6")) ||   // 인턴직원, 위촉직원
            (params.get("division").equals("1") && params.get("divisionSub").equals("4"))   // 위촉연구원
        ){
            // 사번 (ERP_EMP_SEQ) 추가
            String tempNum = "00" + userManageRepository.getMonthJoinNum(params).get("joinNum").toString();
            String monthJoinNum = tempNum.substring(tempNum.length()-3, tempNum.length());
            String erpEmpSeq = "C" + params.get("JOIN_DAY").toString().split("-")[0].substring(2) + params.get("JOIN_DAY").toString().split("-")[1] + monthJoinNum;
            params.put("ERP_EMP_SEQ", erpEmpSeq);
        } else {
            params.put("ERP_EMP_SEQ", "");
        }

        userManageRepository.setUserReqDetailInsert(params);
    }

    @Override
    public void setEducationalInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setEducationalInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile gradeFile = request.getFile("gradeFile");
        MultipartFile socreFile = request.getFile("socreFile");

        if(gradeFile != null){
            if(!gradeFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(gradeFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("gradeFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInGradeFileNoUpd(fileInsMap);
            }
        }

        if(socreFile != null){
            if(!socreFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(socreFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("socreFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInScoreFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setCareerInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setCareerInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile addFile = request.getFile("addFile");

        if(addFile != null){
            if(!addFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(addFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("careerId"));
                fileInsMap.put("careerId", params.get("careerId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("addFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInAddFileNoUpd(fileInsMap);
            }
        }
    }

    /*@Override
    public void setMilitaryInfo(Map<String, Object> map) {
        if(StringUtils.isEmpty(map.get("msiInfoId"))){
            userManageRepository.setMilitaryInfo(map);
        }else{
            userManageRepository.setMilitaryInfoUpd(map);
        }
    }*/

    @Override
    public void setMilitaryInfo(Map<String, Object> params) {
            userManageRepository.setMilitaryInfo(params);
    }

    @Override
    public void setFmailyInfo(Map<String, Object> map) {
        userManageRepository.setFmailyInfo(map);
    }

    @Override
    public void setLicenceInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setLicenceInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile certificateAddFile = request.getFile("certificateAddFile");

        if(certificateAddFile != null){
            if(!certificateAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(certificateAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("certificateId"));
                fileInsMap.put("certificateId", params.get("certificateId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("certificateFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInCertificateFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setJobInfo(Map<String, Object> map) {
        userManageRepository.setJobInfo(map);
    }

    @Override
    public void setAppointingInfo(Map<String, Object> map) {
        userManageRepository.setAppointingInfo(map);
    }

    @Override
    public void setRewardInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setRewardInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile rewardAddFile = request.getFile("rewardAddFile");

        if(rewardAddFile != null){
            if(!rewardAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(rewardAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("rewordId"));
                fileInsMap.put("rewordId", params.get("rewordId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rewardAddFileNo", fileInsMap.get("file_no"));
                System.out.println("***fileInsMap***"+fileInsMap);
                userManageRepository.setInRewardAddFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setEduInfo(Map<String, Object> map) {
        userManageRepository.setEduInfo(map);
    }

    @Override
    public void setWorkEvalInfo(Map<String, Object> map) {
        userManageRepository.setWorkEvalInfo(map);
    }

    @Override
    public void setProposalInfo(Map<String, Object> map) {
        userManageRepository.setProposalInfo(map);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public List<Map<String, Object>> getPersonRecordApplyList(Map<String,Object> map) {
        return userManageRepository.getPersonRecordApplyList(map);
    }

    @Override
    public List<Map<String, Object>> getPersonRecordApplyList2(Map<String,Object> map) {
        return userManageRepository.getPersonRecordApplyList2(map);
    }

    @Override
    public void setUpdateUserInfoModY(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoModY(map);
    }
    @Override
    public void setUpdateUserInfoModN(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoModN(map);
    }
    @Override
    public void setUpdateUserInfoReturnY(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoReturnY(map);
    }
    @Override
    public void setUpdateUserInfoReturnN(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoReturnN(map);
    }

    @Override
    public void setCommissionerPassWdUpd(Map<String, Object> map) {
        userManageRepository.setCommissionerPassWdUpd(map);
    }

    @Override
    public List<Map<String, Object>> getDeptList(Map<String, Object> params){
        return userManageRepository.getDeptList(params);
    }
    @Override
    public Map<String, Object> getUserPersonnelinformList(Map<String, Object> params) {
        return userManageRepository.getUserPersonnelinformList(params);
    }

    @Override
    public Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params) {
        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
        }

        return commonRepository.getContentFileOne(params);
    }

    @Override
    public void setUserResignReg(Map<String, Object> params) {
        userManageRepository.setUserResignReg(params);
    }

    @Override
    public void setUserDel(Map<String, Object> params) {
        userManageRepository.setUserDel(params);
    }

    @Override
    public int setThumbnailUpload(List<Map<String, Object>> list, Map<String, Object> params, String path) throws Exception {
        Map<String, Object> fileParam = new HashMap<>();
        int result = 0;

        for(Map<String, Object> map : list){
            int fileLen = map.get("orgFilename").toString().split("\\.").length;

            String orgFilename = "";
            for(int i = 0 ; i < fileLen - 1 ; i++ ){
                orgFilename = orgFilename + map.get("orgFilename").toString().split("\\.")[i];
            }

            String fileExt = map.get("orgFilename").toString().split("\\.")[fileLen - 1];

            fileParam.put("fileExt", fileExt);
            fileParam.put("fileSize", map.get("fileSize"));
            fileParam.put("fileUUID", map.get("fileUUID"));
            fileParam.put("fileOrgName", orgFilename);

            fileParam.put("fileCd", params.get("menuCd"));
            fileParam.put("filePath", path);
            fileParam.put("empSeq", params.get("empSeq"));

            commonRepository.insOneFileInfo(fileParam);
            result = Integer.parseInt(fileParam.get("file_no").toString());
        }

        return result;
    }

    @Override
    public void setUserInfoReqUpd(Map<String, Object> params) {

        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            userManageRepository.setUserImageUpd(params);   // 업데이트
        } else {
            userManageRepository.setUserImageReq(params);   // 저장
        }
    }
    @Override
    public Map<String,Object> getUserInfoModDetail(Map<String,Object> map) {
        return userManageRepository.getUserInfoModDetail(map);
    }

    @Override
    public Map<String, Object> getKeyInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> returnMap = userManageRepository.getKeyInfo(params);

        Map<String, Object> searchMap = new HashMap<>();

        /*학력사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("GRADE_NO"));
        result.put("gradeFile", commonRepository.getContentFileOne(searchMap));
        searchMap.put("fileNo", returnMap.get("SCORE_NO"));
        result.put("socreFile", commonRepository.getContentFileOne(searchMap));

        /*경력사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("ADD_NO"));
        result.put("addFile", commonRepository.getContentFileOne(searchMap));

        /*보유면허 첨부파일*/
        searchMap.put("fileNo", returnMap.get("CERTIFICATE_ADD_NO"));
        result.put("certificateAddFile", commonRepository.getContentFileOne(searchMap));

        /*상벌사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("REWARD_ADD_NO"));
        result.put("rewardAddFile", commonRepository.getContentFileOne(searchMap));

        return result;
    }

    @Override
    public Map<String, Object> getUserImageList(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            if(infoMap.get("ID_IMAGE_PK") != "" || infoMap.get("ID_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
                resultMap.put("idImg", commonRepository.getContentFileOne(params));
            }
            if(infoMap.get("SIGN_IMAGE_PK") != "" || infoMap.get("SIGN_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("SIGN_IMAGE_PK"));
                resultMap.put("signImg", commonRepository.getContentFileOne(params));
            }
            if(infoMap.get("SIGN2_IMAGE_PK") != "" || infoMap.get("SIGN2_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("SIGN2_IMAGE_PK"));
                resultMap.put("sign2Img", commonRepository.getContentFileOne(params));
            }
            resultMap.put("null", "");
        } else {
            resultMap.put("null", "");
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getSign(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            if(infoMap.get("SIGN_IMAGE_PK") != "" || infoMap.get("SIGN_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("SIGN_IMAGE_PK"));
                resultMap.put("signImg", commonRepository.getContentFileOne(params));
            }
            if(infoMap.get("SIGN2_IMAGE_PK") != "" || infoMap.get("SIGN2_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("SIGN2_IMAGE_PK"));
                resultMap.put("sign2Img", commonRepository.getContentFileOne(params));
            }
            resultMap.put("null", "");
        } else {
            resultMap.put("null", "");
        }

        return resultMap;
    }


    @Override
    public List<Map<String, Object>> getEmploymentContList(Map<String,Object> map) {
        return userManageRepository.getEmploymentContList(map);
    }

    @Override
    public void employExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String localPath = "/downloadFile/";
        String fileName = "연봉계약서 등록양식.xlsx";
        String viewFileNm = "연봉계약서 등록양식.xlsx";
        File reFile = new File(request.getSession().getServletContext().getRealPath(localPath + fileName));

        try {
            if (reFile.exists() && reFile.isFile()) {
                List<Map<String, Object>> searchList = new ArrayList<>();

                FileInputStream file = new FileInputStream(reFile);
                XSSFWorkbook workbook = new XSSFWorkbook(file);
                Cell cell = null;
                int rowIndex = 2;

                /** 사원 목록 */
                XSSFSheet sheet = workbook.getSheetAt(1);
                searchList = userManageRepository.employmentExcelEmpList(null);

                for(int i = 0; i < searchList.size(); i++){
                    XSSFRow row = sheet.createRow(rowIndex++);

                    cell = row.createCell(0);cell.setCellValue(searchList.get(i).get("EMP_SEQ").toString());
                    cell = row.createCell(1);cell.setCellValue(searchList.get(i).get("EMP_NAME_KR").toString());
                    cell = row.createCell(2);cell.setCellValue(searchList.get(i).get("DEPT_SEQ").toString());
                    cell = row.createCell(3);cell.setCellValue(searchList.get(i).get("DEPT_NAME").toString());
                    cell = row.createCell(4);cell.setCellValue(searchList.get(i).get("POSITION_NAME").toString());
                }


                String browser = getBrowser(request);
                String disposition = setDisposition(viewFileNm, browser);
                response.setHeader("Content-Disposition", disposition);
                response.setHeader("Content-Transfer-Encoding", "binary");
                response.setContentType("ms-vnd/excel");

                workbook.write(response.getOutputStream());
                workbook.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Map<String,Object> getEmploymentInfo(Map<String,Object> map) {
        return userManageRepository.getEmploymentInfo(map);
    }

    @Override
    public void employExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception {
        MultipartFile fileNm = request.getFile("salaryFile");

        File dest = new File(fileNm.getOriginalFilename());
        fileNm.transferTo(dest);

        XSSFRow row;
        XSSFCell col0;
        XSSFCell col1;
        XSSFCell col2;
        XSSFCell col3;
        XSSFCell col4;
        XSSFCell col5;
        XSSFCell col6;
        XSSFCell col7;

        FileInputStream inputStream = new FileInputStream(dest);

        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rows = sheet.getPhysicalNumberOfRows();

        DataFormatter dataFormatter = new DataFormatter();

        for(int i=5; i < rows; i++){
            Map<String, Object> salaryMap = new HashMap<>();

            row = sheet.getRow(i);
            col0 = row.getCell(0);
            col1 = row.getCell(1);
            col2 = row.getCell(2);
            col3 = row.getCell(3);
            col4 = row.getCell(4);
            col5 = row.getCell(5);
            col6 = row.getCell(6);
            col7 = row.getCell(7);

            String regDt = "";
            if(!cellValueToString(col5).equals("")) {
                if (col5.getCellType() == Cell.CELL_TYPE_NUMERIC && org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(col5)) {
                    Date dateCellValue = col5.getDateCellValue();
                    regDt = new SimpleDateFormat("yyyy-MM-dd").format(dateCellValue);
                } else {
                    regDt = dataFormatter.formatCellValue(col5);
                }
            }

            if(row != null){
                if(cellValueToString(col0).equals("") || cellValueToString(col1).equals("") ||
                        cellValueToString(col3).equals("") || cellValueToString(col4).equals("") || cellValueToString(col5).equals("") ||
                        cellValueToString(col6).equals("") || cellValueToString(col7).equals("")){
                    return;
                } else {
                    salaryMap.put("empSeq", cellValueToString(row.getCell(0)));
                    salaryMap.put("empName", cellValueToString(row.getCell(1)));
                    salaryMap.put("deptSeq", cellValueToString(row.getCell(2)));
                    salaryMap.put("deptName", cellValueToString(row.getCell(3)));
                    salaryMap.put("positionName", cellValueToString(row.getCell(4)));
                    salaryMap.put("regDt", regDt);
                    salaryMap.put("bySalary", cellValueToString(row.getCell(6)));
                    salaryMap.put("nyRaiseSalary", cellValueToString(row.getCell(7)));
                    salaryMap.put("nySalary", cellValueToString(row.getCell(8)));
                    salaryMap.put("nyDecisionSalary", cellValueToString(row.getCell(9)));
                    salaryMap.put("regEmpSeq", params.get("empSeq"));
                    userManageRepository.setEmploymentContract(salaryMap);
                }
            }
        }
    }

    @Override
    public void setEmploymentContract(Map<String, Object> map) {
        userManageRepository.setEmploymentContract(map);
    }

    @Override
    public void sendSalaryWorkerReq(List<String> params) {
        userManageRepository.sendSalaryWorkerReq(params);
    }

    @Override
    public void setSalaryContractDel(Map<String, Object> params) {
        userManageRepository.setSalaryContractDel(params);
    }

    @Override
    public void setEmploymentInfoFlag(Map<String, Object> map) {
        userManageRepository.setEmploymentInfoFlag(map);
    }

    @Override
    public Object updateUserBankInfo(Map<String, Object> params) {
        return userManageRepository.updateUserBankInfo(params);
    }

    @Override
    public Object setUserReqDetailUpdate(Map<String, Object> params) {
        String passwordTmp = params.get("LOGIN_PASSWD").toString();
        if(!passwordTmp.equals("")){
            String password = Hashing.sha256().hashString(passwordTmp, StandardCharsets.UTF_8).toString();
            params.put("password", password);
        }
        return userManageRepository.setUserReqDetailUpdate(params);
    }

    //인사기록카드 - 삭제할 학력사항 선택
    @Override
    public List<Map<String, Object>> getEduDeleteList(List<Integer> eduChk) {
        return userManageRepository.getEduDeleteList(eduChk);
    }

    //인사기록카드 - 학력사항 삭제 요청 데이터 카피
    @Override
    public void setEduDeleteTmp(Map<String, Object> map) {
            userManageRepository.setEduDeleteTmp(map);

    }

    //인사기록카드 - 학력사항 삭제
    @Override
    public Map<String, Object> setEduDelete(List<String> eduChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setEduDelete(eduChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 경력사항 선택
    @Override
    public List<Map<String,Object>> getCareerDeleteList(List<Integer> employChk){
        return userManageRepository.getCareerDeleteList(employChk);
    }

    //인사기록카드 - 경력사항 삭제 요청 데이터 카피
    @Override
    public  void setCareerDeleteTmp(Map<String,Object> map){
        userManageRepository.setCareerDeleteTmp(map);
    }

    //인사기록카드 - 경력사항 삭제
    @Override
    public Map<String, Object> setCareerDelete(List<String> employChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setCareerDelete(employChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 가족사항 선택
    @Override
    public List<Map<String, Object>> getFamilyDeleteList(List<Integer> familyChk) {
        return userManageRepository.getFamilyDeleteList(familyChk);
    }

    //인사기록카드 - 가족사항 삭제 요청 데이터 카피
    @Override
    public void setFamilyDeleteTmp(Map<String,Object> map){
        userManageRepository.setFamilyDeleteTmp(map);
    }

    //인사기록카드 - 가족사항 삭제
    @Override
    public Map<String, Object> setFamilyDelete(List<String> familyChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setFamilyDelete(familyChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 보유면허 선택
    @Override
    public List<Map<String,Object>> getLicenseDeleteList(List<Integer> certChk){
        return userManageRepository.getLicenseDeleteList(certChk);
    }

    //인사기록카드 - 보유면허 삭제 요청 데이터 카피
    @Override
    public void setLicenseDeleteTmp(Map<String, Object> map){
        userManageRepository.setLicenseDeleteTmp(map);
    }

    //인사기록카드 - 보유면허 삭제
    @Override
    public Map<String, Object> setLicenseDelete(List<String> certChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setLicenseDelete(certChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 직무사항 선택
    @Override
    public List<Map<String,Object>> getJobDeleteList(List<Integer> dutyInfoChk){
        return userManageRepository.getJobDeleteList(dutyInfoChk);
    }

    //인사기록카드 - 직무사항 삭제 요청 데이터 카피
    @Override
    public void setJobDeleteTmp(Map<String,Object> map){
        userManageRepository.setJobDeleteTmp(map);
    }

    //인사기록카드 - 직무사항 삭제
    @Override
    public Map<String, Object> setJobDelete(List<String> dutyInfoChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setJobDelete(dutyInfoChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 상벌사항 선택
    @Override
    public List<Map<String,Object>> getRewordDeleteList(List<Integer> rewordChk){
        return userManageRepository.getRewordDeleteList(rewordChk);
    }

    //인사기록카드 - 상벌사항 삭제 요청 데이터 카피
    @Override
    public void setRewordDeleteTmp(Map<String,Object> map){
        userManageRepository.setRewordDeleteTmp(map);
    }

    //인사기록카드 - 상벌사항 삭제
    @Override
    public Map<String, Object> setRewordDelete(List<String> rewordChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setRewordDelete(rewordChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 삭제할 제안제도 선택
    @Override
    public List<Map<String,Object>> getProposalDeleteList (List<Integer> propChk){
        return userManageRepository.getProposalDeleteList(propChk);
    }

    //인사기록카드 - 제안제도 삭제 요청 데이터 카피
    @Override
    public void setProposalDeleteTmp(Map<String,Object> map){
        userManageRepository.setProposalDeleteTmp(map);
    }

    //인사기록카드 - 제안제도 삭제
    @Override
    public Map<String, Object> setProposalDelete(List<String> propChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setProposalDelete(propChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getEduinfoList(Map<String, Object> params) {
        return userManageRepository.getEduinfoList(params);
    }

    //상벌사항 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getRewinfoList(Map<String, Object> params) {
        return userManageRepository.getRewinfoList(params);
    }

    //제안제도 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getProinfoList(Map<String, Object> params) {
        return userManageRepository.getProinfoList(params);
    }

    // 경력사항 수정 항목
    @Override
    public Map<String, Object> getCarinfoList(Map<String, Object> params) {
        return userManageRepository.getCarinfoList(params);
    }

    // 가족사항 수정 항목
    @Override
    public Map<String, Object> getFaminfoList(Map<String, Object> params) {
        return userManageRepository.getFaminfoList(params);
    }
    // 보유면허 수정 항목
    @Override
    public Map<String, Object> getLininfoList(Map<String, Object> params) {
        return userManageRepository.getLininfoList(params);
    }

    // 직무사항 수정 항목
    @Override
    public Map<String, Object> getJobinfoList(Map<String, Object> params) {
        return userManageRepository.getJobinfoList(params);
    }

    // 직원 생일 리스트
    @Override
    public List<Map<String, Object>> getEmpBirthDayInfoList(Map<String, Object> map) {
        return userManageRepository.getEmpBirthDayInfoList(map);
    }

    @Override
    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return userManageRepository.getEmpInfo(params);
    }
    public Map<String, Integer> getCountMap() {
        Map<String, Integer> countMap = new HashMap<>();
        Map<String, Object> params = new HashMap<>();
        countMap.put("dsA", userManageRepository.getCountForDsA());
        countMap.put("dsB", userManageRepository.getCountForDsB());
        countMap.put("dsC", userManageRepository.getCountForDsC());
        countMap.put("dsD", userManageRepository.getCountForDsD());
        countMap.put("dsE", userManageRepository.getCountForDsE());
        countMap.put("dsF", userManageRepository.getCountForDsF());
        countMap.put("dsG", userManageRepository.getCountForDsG());
        countMap.put("dsH", userManageRepository.getCountForDsH());
        countMap.put("dsI", userManageRepository.getCountForDsI(params));
        countMap.put("dsJ", userManageRepository.getCountForDsJ());

        return countMap;
    }
    public Map<String, Integer> getCountMap2() {
        Map<String, Integer> countMap = new HashMap<>();
        countMap.put("dsA", userManageRepository.getCountForDsA2());
        countMap.put("dsB", userManageRepository.getCountForDsB2());
        countMap.put("dsC", userManageRepository.getCountForDsC2());
        countMap.put("dsD", userManageRepository.getCountForDsD2());
        countMap.put("dsE", userManageRepository.getCountForDsE2());
        countMap.put("dsG", userManageRepository.getCountForDsG2());

        return countMap;
    }

    @Override
    public Map<String, Object> getCountForDsI(Map<String, Object> params) {
        Map<String, Object> countMap = new HashMap<>();
        countMap.put("dsI", userManageRepository.getCountForDsI(params));
        return countMap;
    }

    @Override
    public List<Map<String, Object>> getTotalEmpCount(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ",9999)";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getTotalEmpCount(params);
    }

    @Override
    public List<Map<String, Object>> getJoinResignEmpList(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getJoinResignEmpList(params);
    }

    @Override
    public void userDegreeInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userDegreeInfoInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile gradeFile = request.getFile("gradeFile");
        MultipartFile socreFile = request.getFile("socreFile");

        if(gradeFile != null){
            if(!gradeFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(gradeFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("gradeFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInGradeFileNoUpdAdmin(fileInsMap);
            }
        }

        if(socreFile != null){
            if(!socreFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(socreFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("socreFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInScoreFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userDegreeInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userDegreeInfoModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile gradeFile = request.getFile("gradeFile");
        MultipartFile socreFile = request.getFile("socreFile");

        if(gradeFile != null){
            if(!gradeFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(gradeFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("gradeFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInGradeFileNoUpdAdmin(fileInsMap);
            }
        }

        if(socreFile != null){
            if(!socreFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(socreFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("socreFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInScoreFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userDegreeInfoDelete(Map<String, Object> params) {
        userManageRepository.userDegreeInfoDelete(params);
    }


    @Override
    public void userCareerInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userCareerInfoInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile addFile = request.getFile("addFile");

        if(addFile != null){
            if(!addFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(addFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("careerId"));
                fileInsMap.put("careerId", params.get("careerId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("addFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInAddFileNoUpdAdmin(fileInsMap);
            }
        }


    }

    @Override
    public void userCareerInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userCareerInfoModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile addFile = request.getFile("addFile");

        if(addFile != null){
            if(!addFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(addFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("careerId"));
                fileInsMap.put("careerId", params.get("careerId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("addFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInAddFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userCareerInfoDelete(Map<String, Object> params) {
        userManageRepository.userCareerInfoDelete(params);
    }

    @Override
    public void userMilitaryInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        userManageRepository.userMilitaryInfoModify(params);
    }




    @Override
    public void userLinInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userLinInfoInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile certificateAddFile = request.getFile("certificateAddFile");

        if(certificateAddFile != null){
            if(!certificateAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(certificateAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("certificateId"));
                fileInsMap.put("certificateId", params.get("certificateId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("certificateFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInCertificateFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userLinInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userLinInfoModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile certificateAddFile = request.getFile("certificateAddFile");

        if(certificateAddFile != null){
            if(!certificateAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(certificateAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("certificateId"));
                fileInsMap.put("certificateId", params.get("certificateId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("certificateFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInCertificateFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userLinInfoDelete(Map<String, Object> params) {
        userManageRepository.userLinInfoDelete(params);
    }

    @Override
    public void userJobInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userJobInfoInsert(params);
    }

    @Override
    public void userJobInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userJobInfoModify(params);
    }

    @Override
    public void userJobInfoDelete(Map<String, Object> params) {
        userManageRepository.userJobInfoDelete(params);
    }

    @Override
    public void userRewInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userRewInfoInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile rewardAddFile = request.getFile("rewardAddFile");

        if(rewardAddFile != null){
            if(!rewardAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(rewardAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("rewordId"));
                fileInsMap.put("rewordId", params.get("rewordId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rewardAddFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInRewardAddFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userRewInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userRewInfoModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile rewardAddFile = request.getFile("rewardAddFile");

        if(rewardAddFile != null){
            if(!rewardAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(rewardAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("rewordId"));
                fileInsMap.put("rewordId", params.get("rewordId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rewardAddFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInRewardAddFileNoUpdAdmin(fileInsMap);
            }
        }
    }

    @Override
    public void userRewInfoDelete(Map<String, Object> params) {
        userManageRepository.userRewInfoDelete(params);
    }

    @Override
    public void setCardEtc(Map<String, Object> params) {
        userManageRepository.setCardEtc(params);
    }

    @Override
    public void userFamilyInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userFamilyInfoInsert(params);
    }

    @Override
    public void userFamilyInfoModify(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.userFamilyInfoModify(params);
    }

    @Override
    public void userFamilyInfoDelete(Map<String, Object> params) {
        userManageRepository.userFamilyInfoDelete(params);
    }

    /**소속현황**/
    @Override
    public List<Map<String, Object>> getDeptTeamEmpCount(Map<String, Object> params) {
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        List<Map<String, Object>> deptEmpCount = userManageRepository.getDeptEmpCount(params);
        List<Map<String, Object>> teamEmpCount = userManageRepository.getTeamEmpCount(params);

        // 두 개의 결과를 합치기
        List<Map<String, Object>> combinedResult = new ArrayList<>();
        combinedResult.addAll(deptEmpCount);
        combinedResult.addAll(teamEmpCount);

        return combinedResult;
    }


//    년도별 직급 현황
    @Override
    public List<Map<String, Object>> getPositionNameByYear(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
                for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                if(!arrL[1].equals("N")){
                    returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                }
            }
            returnTxt += ")";

            arr[i] = returnTxt;
        }
        params.put("arr", arr);
        }
    return userManageRepository.getPositionNameByYear(params);
    }

    // 년도별 직급 현황 팝업(리스트)
    @Override
    public List<Map<String, Object>> getPositionListByYear(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getPositionListByYear(params);
    }

    //년도별 발령 현황
    @Override
    public List<Map<String, Object>> getApntNameByYear(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getApntNameByYear(params);
    }

    //년도별 발령 현황 팝업
    @Override
    public List<Map<String, Object>> getApntListByYear(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getApntListByYear(params);
    }

    /**직급 현황**/
    @Override
    public List<Map<String, Object>> getEmpCountsByPosition(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getEmpCountsByPosition(params);
    }

    // 성별/연령별 현황
    @Override
    public List<Map<String, Object>> getGenderCount(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getGenderCount(params);
    }
    @Override
    public List<Map<String ,Object>> getAgeCount(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getAgeCount(params);
    }

    // 학위별 현황

    @Override
    public List<Map<String, Object>> getDegreeCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getDegreeCount(params);
    }

    // 소속 현황(부서) 팝업
    public List<Map<String, Object>> getDeptListByCount(Map<String, Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getDeptListByCount(params);
    }

    // 소속 현황(팀) 팝업
    @Override
    public List<Map<String, Object>> getTeamListByCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getTeamListByCount(params);
    }

    // 직급 현황 (팝업)
    @Override
    public List<Map<String, Object>> getPositionListByCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getPositionListByCount(params);
    }

    // 성별/연령별 현황 (팝업)
    @Override
    public List<Map<String, Object>> getGenderListByCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getGenderListByCount(params);
    }
    @Override
    public List<Map<String, Object>> getAgeListByCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getAgeListByCount(params);
    }

    // 학위별 현황 (팝업)
    @Override
    public List<Map<String, Object>> getDegreeListByCount(Map<String ,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getDegreeListByCount(params);
    }

    public Map<String, Object> getTotalEmployeeCount(Map<String,Object> params) {

        return userManageRepository.getTotalEmployeeCount(params);
    }

    public Map<String,Object> getCurrentPositionByYear(Map<String,Object> params){
        if(params.containsKey("arr") && !"".equals(params.get("arr").toString())){
            String arrText = params.get("arr").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");

                String returnTxt = "(DIVISION IN(" + arrL[0] + ",9999)";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";

                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return userManageRepository.getCurrentPositionByYear(params);
    }

    public String cellValueToString(XSSFCell cell){
        String txt = "";

        try {
            if(cell.getCellType() == XSSFCell.CELL_TYPE_STRING){
                txt = cell.getStringCellValue();
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC){
                txt = String.valueOf( Math.round(cell.getNumericCellValue()) );
            }else if(cell.getCellType() == XSSFCell.CELL_TYPE_FORMULA){
                txt = cell.getRawValue();
            }
        } catch (Exception e) {

        }
        return txt;
    }

    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.indexOf("MSIE") > -1) { // IE 10 �씠�븯
            return "MSIE";
        } else if (header.indexOf("Trident") > -1) { // IE 11
            return "MSIE";
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        }
        return "Firefox";
    }

    private String setDisposition(String filename, String browser) throws Exception {
        String dispositionPrefix = "attachment; filename=";
        String encodedFilename = null;

        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "ISO-8859-1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else {

        }
        return dispositionPrefix + encodedFilename;
    }

    @Override
    public void setEduReqDetailInsert(Map<String,Object> params){userManageRepository.setEduReqDetailInsert(params);}

    @Override
    public void setCareerReqDetailInsert(Map<String,Object> params){userManageRepository.setCareerReqDetailInsert(params);}

    @Override
    public void setCertReqDetailInsert(Map<String,Object> params){userManageRepository.setCertReqDetailInsert(params);}

    @Override
    public void setTmpDuty(Map<String,Object> params){
        userManageRepository.setTmpDuty(params);
    }

    @Override
    public void setTmpDutyDel(Map<String,Object> params) {
        userManageRepository.setTmpDutyDel(params);
    }

    @Override
    public List<Map<String, Object>> getTmpDutyList(Map<String ,Object> params){
        List<Map<String, Object>> list = userManageRepository.getTmpDutyList(params);
        return list;
    }

    @Override
    public List<Map<String, Object>> getAllDutyList(Map<String ,Object> params){
        List<Map<String, Object>> list = userManageRepository.getAllDutyList(params);
        return list;
    }

}
