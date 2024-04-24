package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.inside.document.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PayAppServiceImpl implements PayAppService {

    @Autowired
    private PayAppRepository payAppRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PurcService purcService;

    @Override
    public void payAppSetData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payAppSn")){
            payAppRepository.insPayAppData(params);

            //지급신청서 최초 저장 시 INSERT
            if(params.containsKey("bsYm")) {
                payAppRepository.insPayAppBsYm(params);
            }
        } else {
            payAppRepository.updPayAppData(params);
            payAppRepository.delPayAppDetailData(params);
            payAppRepository.updPayAppBsYm(params);
        }

        // 법인카드 증빙서류 생성
        createPdf(params, serverDir, baseDir);

        // 구매청구에서 지급신청시 claimSn Key 가져옴

        // 출장 지급신청시 hrBizReqResultId Key 가져옴
        if(params.containsKey("hrBizReqResultId")){
            String[] hrBizReqResultIdArr = params.get("hrBizReqResultId").toString().split(",");

            Map<String, Object> paramMaps = new HashMap<>();
            for(String hrBizReqResultId : hrBizReqResultIdArr){
                paramMaps.put("payAppSn", params.get("payAppSn"));
                paramMaps.put("hrBizReqResultId", hrBizReqResultId);

                // 출장 지급신청 Key Insert
                payAppRepository.updPurcBustripByPayAppSn(paramMaps);
            }
        }

        // 출장 사전정산시 hrBizReqResultId Key 가져옴
        if(params.containsKey("hrBizReqId")){
            // 출장 지급신청 Key Insert
            payAppRepository.updBusinessByPayAppSn(params);
        }

        // 영수증, 전표등 있을 시 첨부파일 복사
        if(params.containsKey("bList")){
            // 출장 지급신청 Key Insert
            payAppRepository.updBustripExnpFileCopy(params);
        }

        // 식대대장 지급신청시 snackInfoSn Key 가져옴
        if(params.containsKey("snackInfoSn")){
            String[] snackInfoSnArr = params.get("snackInfoSn").toString().split(",");

            Map<String, Object> paramMaps = new HashMap<>();
            for(String snackInfoSn : snackInfoSnArr){
                paramMaps.put("payAppSn", params.get("payAppSn"));
                paramMaps.put("snackInfoSn", snackInfoSn);

                // 식대대장 지급신청 Key Insert
                payAppRepository.updPurcSnackByPayAppSn(paramMaps);
            }
        }
        // 영수증, 전표등 있을 시 첨부파일 복사
        if(params.containsKey("sList")){
            // 스낵 지급신청 Key Insert
            payAppRepository.updSnackExnpFileCopy(params);
        }

        if(params.containsKey("claimExnpSn")){
            List<Map<String, Object>> lsMap = payAppRepository.getClaimExnpData(params);

            for(Map<String, Object> map : lsMap){
                params.put("claimExnpSn", map.get("CLAIM_EXNP_SN"));
                payAppRepository.updClaimExnpSn(params);
            }
        } else if(params.containsKey("claimSn")){
            // 구매청구관리 지급신청 Key Insert
            payAppRepository.updPurcClaimByPayAppSn(params);
        }

        commonRepository.updFileOwnerNull(params);

        for(Map<String, Object> map : itemArr){
            map.put("payAppSn", params.get("payAppSn"));

            payAppRepository.insPayAppDetailData(map);

            String filePath = "/upload/useCard/" + map.get("authNo") + "/" + map.get("authDd") + "/" + map.get("authHh") + "/" + map.get("cardNo").toString().replaceAll("-", "") + "/" + map.get("buySts") + "/";
            map.put("filePath", filePath);

            commonRepository.updFileOwner(map);
        }

        // 세금계산서, 법인카드 사용내역 저장
        List<Map<String, Object>> payAppItemList = payAppRepository.getPayAppItemList(params);
        List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(params);
        params.put("PAY_APP_SN", params.get("payAppSn"));
        // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
        for(Map<String, Object> subMap : useEtaxList){
            if(Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                payAppRepository.updUseEtaxPayAppNull(params);
            } else {
                payAppRepository.delUseEtaxInfo(params);
            }
        }
        List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
        for(Map<String, Object> subMap : useCardList){
            if(Integer.parseInt(subMap.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(subMap.get("BIZ_REQ_CHK").toString()) > 0 ||
                    Integer.parseInt(subMap.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                payAppRepository.updUseCardPayAppNull(params);
            } else {
                payAppRepository.delUseCardInfo(params);
            }
        }

        for(Map<String, Object> map : payAppItemList){
            if(map.get("EVID_TYPE").toString().equals("1") || map.get("EVID_TYPE").toString().equals("2")){
                int useCardChk = payAppRepository.getUseEtaxInfoCheck(map);
                // dj_use_etax_info 테이블에 저장된 내역이면 payAppSn PK update, 없으면 insert
                if (useCardChk > 0) {
                    payAppRepository.updUseEtaxPayApp(map);
                } else {
                    payAppRepository.insUseEtaxInfo(map);
                }
            } else if(map.get("EVID_TYPE").toString().equals("3")){
                int useCardChk = payAppRepository.getUseCardInfoCheck(map);
                // dj_use_card_info 테이블에 저장된 내역이면 payAppSn PK update, 없으면 insert
                if (useCardChk > 0) {
                    payAppRepository.updUseCardPayApp(map);
                } else {
                    payAppRepository.insUseCardInfo(map);
                }
            }
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 지급신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        if(params.containsKey("payAppSn")){
            List<Map<String, Object>> list = payAppRepository.getPayAppDetailData(params);

            String[] fileNoAr = new String[list.size()];
            for(int i = 0; i < list.size(); i++){
                if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                    fileNoAr[i] = "";
                } else {
                    fileNoAr[i] = list.get(i).get("FILE_NO").toString();
                }
            }
            params.put("fileNoAr", fileNoAr);

            List<Map<String, Object>> storedFileArr = new ArrayList<>();
            if(params.containsKey("snackInfoSn")){
                params.put("snackInfoSnArr", params.get("snackInfoSn").toString().split(","));
//                storedFileArr = documentRepository.getFileList(params);
            } else if(params.containsKey("claimExnpSn")){
                storedFileArr = purcService.purcFileList(params);
            } else {
                storedFileArr = payAppRepository.getPayAppFileList(params);
            }

            payAppRepository.delPayAppFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payAppSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayAppFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", "payApp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payAppSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayAppFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }

        if(params.containsKey("cardToSn")){
            payAppRepository.updCardToPayApp(params);
        }
    }

    @Override
    public void payAppMngFileSet(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 지급신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        if(params.containsKey("payAppSn")){
            List<Map<String, Object>> list = payAppRepository.getPayAppDetailData(params);

            String[] fileNoAr = new String[list.size()];
            for(int i = 0; i < list.size(); i++){
                if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                    fileNoAr[i] = "";
                } else {
                    fileNoAr[i] = list.get(i).get("FILE_NO").toString();
                }
            }
            params.put("fileNoAr", fileNoAr);

            List<Map<String, Object>> storedFileArr = new ArrayList<>();
            storedFileArr = payAppRepository.getPayAppFileList(params);

            payAppRepository.delPayAppFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payAppSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayAppFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", "payApp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payAppSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayAppFileList(list.get(i));
            }
        }
    }

    @Override
    public Map<String, Object> getPayAppReqData(Map<String, Object> params) {
        return payAppRepository.getPayAppReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();

        if(params.containsKey("payAppDetSn")){
            String payAppDetSnArr[] = params.get("payAppDetSn").toString().split(",");
            for(String payAppDetSn : payAppDetSnArr){
                Map<String, Object> map = new HashMap<>();
                params.put("payAppDetSn", payAppDetSn);
                map = payAppRepository.getPayAppDetailInfo(params);
                list.add(map);
            }


            return list;
        } else {
            return payAppRepository.getPayAppDetailData(params);
        }

    }

    @Override
    public List<Map<String, Object>> getPaymentList(Map<String, Object> params) {
        return payAppRepository.getPaymentList(params);
    }

    @Override
    public List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params) {
        return payAppRepository.getWaitPaymentList(params);
    }

    @Override
    public void updatePayAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payAppSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        Map<String, Object> payAppInfo = payAppRepository.getPayAppInfo(params);
        List<Map<String, Object>> payAppItemList = payAppRepository.getPayAppItemList(params);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updatePayAppApprStat(params);

            /*for(Map<String, Object> map : payAppItemList){
                if(map.get("EVID_TYPE").toString().equals("1") || map.get("EVID_TYPE").toString().equals("2")){
                    payAppRepository.insUseEtaxInfo(map);
                } else if(map.get("EVID_TYPE").toString().equals("3")){
                    int useCardChk = payAppRepository.getUseCardInfoCheck(map);

                    if (useCardChk > 0) {
                        payAppRepository.updUseCardPayApp(map);
                    } else {
                        payAppRepository.insUseCardInfo(map);
                    }
                }
            }*/
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updatePayAppApprStat(params);

            List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(params);
            // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
            for(Map<String, Object> map : useEtaxList){
                if(Integer.parseInt(map.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseEtaxPayAppNull(map);
                } else {
                    payAppRepository.delUseEtaxInfo(map);
                }
            }

            List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
            for(Map<String, Object> map : useCardList){
                if(Integer.parseInt(map.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(map.get("BIZ_REQ_CHK").toString()) > 0 ||
                        Integer.parseInt(map.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(map.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseCardPayAppNull(map);
                } else {
                    payAppRepository.delUseCardInfo(map);
                }
            }
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updatePayAppFinalApprStat(params);
//            payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateExnpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("exnpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updateExnpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateExnpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updateExnpFinalApprStat(params);
            Map<String, Object> pkMap = payAppRepository.getExnpData(params);
            if("1".equals(pkMap.get("PAY_APP_TYPE"))){
                params.put("payAppType", pkMap.get("PAY_APP_TYPE"));
                updateG20ExnpFinalAppr(params, "app");
            }
            //payAppRepository.updatePurcListFinalApprStat(params);
        }
    }

    @Override
    public void updateIncpAppDocState(Map<String, Object> bodyMap) {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("payIncpSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            payAppRepository.updateIncpApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            payAppRepository.updateIncpApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            payAppRepository.updateIncpFinalApprStat(params);
            updateG20IncpFinalAppr(params, "app");
        }
    }

    @Override
    public void setPayAppDetData(Map<String, Object> params) {
        payAppRepository.updPayAppDetStat(params);
    }

    @Override
    public void setPayAppCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppCostApp(params);
    }

    @Override
    public void setPayAppDetCostApp(Map<String, Object> params) {
        payAppRepository.setPayAppDetCostApp(params);
    }

    @Override
    public void setExnpData(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if("".equals(params.get("payAppSn")) || params.get("payAppSn") == null){
            params.remove("payAppSn");
        }
        if(!params.containsKey("exnpSn")){
            if(!params.containsKey("payAppDetSn")){
                params.put("payAppDetSn", null);
            }
            payAppRepository.insExnpData(params);
        } else {
            payAppRepository.updExnpData(params);
            payAppRepository.delExnpDetailData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("exnpSn", params.get("exnpSn"));
            payAppRepository.insExnpDetailData(map);
        }

        if(params.containsKey("item")){
            if(!"".equals(params.get("item").toString())){
                String[] items = params.get("item").toString().split(",");

                for (String item : items){
                    params.put("item", item);
                    payAppRepository.updPayAppDetailStatus(params);
                }
            }
        }

    }

    @Override
    public Map<String, Object> getExnpData(Map<String, Object> params) {
        return payAppRepository.getExnpData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpDetailData(Map<String, Object> params) {
        return payAppRepository.getExnpDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {
        return payAppRepository.getExnpList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpReList(Map<String, Object> params) {
        return payAppRepository.getExnpReList(params);
    }

    @Override
    public List<Map<String, Object>> getExnpReListForExcelDown(Map<String, Object> params) {
        return payAppRepository.getExnpReListForExcelDown(params);
    }

    @Override
    public List<Map<String, Object>> getIncpList(Map<String, Object> params) {
        return payAppRepository.getIncpList(params);
    }

    @Override
    public List<Map<String, Object>> getIncpReList(Map<String, Object> params) {
        return payAppRepository.getIncpReList(params);
    }

    @Override
    public void payIncpSetData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(!params.containsKey("payIncpSn")){
            payAppRepository.insPayIncpData(params);
        } else {
            payAppRepository.updPayIncpData(params);
            payAppRepository.delPayIncpDetailData(params);
        }

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepoData(params);
        }

        for(Map<String, Object> map : itemArr){
            map.put("payIncpSn", params.get("payIncpSn"));
            payAppRepository.insPayIncpDetailData(map);
        }

        MainLib mainLib = new MainLib();

        /** 수입결의서 관련 파일 정보 dj_pay_incp_file에 저장  */
        if(params.containsKey("payIncpSn")){
            List<Map<String, Object>> storedFileArr = payAppRepository.getStoredPayIncpFileList(params);
            payAppRepository.delPayIncpFileList(params);

            for(Map<String, Object> map : storedFileArr){
                map.put("contentId", params.get("payIncpSn"));
                map.put("fileNo", map.get("file_no"));

                commonRepository.insPayIncpFileList(map);
            }
        }

        if(fileList.length > 0){
            params.put("menuCd", "payIncp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payIncpSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayIncpFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPayIncpReqData(Map<String, Object> params) {
        return payAppRepository.getPayIncpReqData(params);
    }

    @Override
    public List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params) {
        return payAppRepository.getPayIncpDetailData(params);
    }

    @Override
    public List<Map<String, Object>> getStoredPayIncpFileList(Map<String, Object> params) {
        return payAppRepository.getStoredPayIncpFileList(params);
    }

    @Override
    public void resolutionExnpAppr(Map<String, Object> params) {
        updateG20ExnpFinalAppr(params, "resolution");
        payAppRepository.resolutionExnpStatus(params);

        /** 구매지급신청일때 */
        params.put("payAppSn", payAppRepository.getExnpData(params).get("PAY_APP_SN"));
        payAppRepository.updClaimExnpInfo(params);
    }

    @Override
    public void resolutionIncpAppr(Map<String, Object> params) {
        updateG20IncpFinalAppr(params, "resolution");
        payAppRepository.resolutionIncpAppr(params);
    }

    private void updateG20ExnpFinalAppr(Map<String, Object> params, String type){
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> pkMap = payAppRepository.getExnpData(params);

        params.put("empSeq", pkMap.get("EMP_SEQ"));

        /** 1.지출결의서 일때 세금계산서, 계산서, 신용카드는 반제결의 승인시 g20 프로시저 호출 해야 함 */
        if("1".equals(pkMap.get("PAY_APP_TYPE"))){
            if(type.equals("resolution")){
                params.put("evidTypeArr", "1,2,3,4,5,6,9");
                list = payAppRepository.getExnpG20List(params);
            } else {
                params.put("evidTypeArr", "1,2,3");
                list = payAppRepository.getExnpG20List(params);
            }
        } else if("2".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        } else if("3".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        } else if("4".equals(pkMap.get("PAY_APP_TYPE"))){
            list = payAppRepository.getExnpG20List(params);
        }


        if(list.size() != 0){
            Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
            Map<String, Object> execMap = new HashMap<>();
            int i = 0;

            int docNumber = 0;          // 전체 지출결의서 CNT
            docNumber = payAppRepository.getCountDoc(list.get(i));
            int userSq = docNumber + 1;

            for(Map<String, Object> data : list) {

//                int docNumber = 0;          // 전체 지출결의서 CNT
//                docNumber = payAppRepository.getCountDoc(list.get(i));
//                int userSq = docNumber + 1;

                int exnpDocNumber = 0;      // 같은 지출결의서 CNT
                exnpDocNumber = payAppRepository.getExnpCountDoc(data);
                data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));

                while (true){
                    int duplCheck = payAppRepository.getExnpCheck(data);
                    if (duplCheck == 0) {
                        break;
                    }

                    exnpDocNumber++;
                    data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
                }

//                userSq++;

                data.put("USER_SQ", userSq);

                Map<String, Object> tradeMap = g20Repository.getTradeInfo(data);
                Map<String, Object> hearnerMap = g20Repository.getHearnerInfo(data);

                if(tradeMap != null) {
                    data.put("REG_NB", tradeMap.get("REG_NB"));
                    data.put("PPL_NB", tradeMap.get("PPL_NB"));
                    data.put("CEO_NM", tradeMap.get("CEO_NM"));
                    data.put("BUSINESS", tradeMap.get("BUSINESS"));
                    data.put("JONGMOK", tradeMap.get("JONGMOK"));
                    data.put("ZIP", tradeMap.get("ZIP"));
                    data.put("DIV_ADDR1", tradeMap.get("DIV_ADDR1"));
                    data.put("ADDR2", tradeMap.get("ADDR2"));
                }

                if(hearnerMap != null) {
                    data.put("ETCDATA_CD", hearnerMap.get("ETCDATA_CD"));
                    data.put("ETCPER_CD", hearnerMap.get("ETCPER_CD"));
                    data.put("ETCREG_NO", hearnerMap.get("ETCREG_NO"));
                    data.put("ETCPER_NM", hearnerMap.get("ETCPER_NM"));
                    data.put("ETCZIP_CD", hearnerMap.get("ETCZIP_CD"));
                    data.put("ETCADDR", hearnerMap.get("ETCADDR"));
                    data.put("ETCPHONE", hearnerMap.get("ETCPHONE"));
                    data.put("ETCBANK_CD", "");
                    data.put("ETCACCT_NO", hearnerMap.get("ETCACCT_NO"));
                    data.put("ETCACCT_NM", hearnerMap.get("ETCACCT_NM"));
                    data.put("ETCRVRS_YM", hearnerMap.get("ETCRVRS_YM"));
                    data.put("ETCDIV_CD", hearnerMap.get("ETCDIV_CD"));
                    data.put("ETCDUMMY1", "76");
                }

                if(data.get("EVID_TYPE").toString().equals("1")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "1");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "1");
                        data.put("TR_FG", "3");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("2")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "1");
                        data.put("TR_FG", "3");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("3")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("4")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                } else if(data.get("EVID_TYPE").toString().equals("5")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "4");

                    if(hearnerMap == null){
                        data.put("ETCPER_NM", data.get("TR_NM"));
                        data.put("ETCACCT_NO", data.get("CRM_ACC_NO"));
                        data.put("ETCACCT_NM", data.get("CRM_ACC_HOLDER"));
                        data.put("ETCRVRS_YM", data.get("IN_DT").toString().substring(0, 6));
                        data.put("ETCDIV_CD", data.get("DIV_CD"));
                        data.put("ETCDUMMY1", "76");
                    }
                } else {
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");
                }

                if((data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3")) && type.equals("resolution")) {
                    if (data.get("DOCU_FG").toString().equals("1")) {
                        data.put("DOCU_FG", "99");
                    }

                    data.put("IN_DT_TMP", data.get("IN_DT"));
                    data.put("IN_DT", data.get("EXEC_DT"));
                } else {
                    data.put("IN_DT_TMP", data.get("IN_DT"));
                }


                g20Repository.insZnSautoabdocu(data);


                i++;

                payAppRepository.updExnpStat(data);

                if(type.equals("resolution") || (data.get("EVID_TYPE").toString().equals("1") || data.get("EVID_TYPE").toString().equals("2") || data.get("EVID_TYPE").toString().equals("3"))
                    || "2".equals(pkMap.get("PAY_APP_TYPE")) || "3".equals(pkMap.get("PAY_APP_TYPE")) || "4".equals(pkMap.get("PAY_APP_TYPE"))) {
                    if(list.size() == i) {
                        data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                        g20Repository.execUspAncj080Insert00(data);
                    }
                }
            }
        }

    }

    private void updateG20IncpFinalAppr(Map<String, Object> params, String type){
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> pkMap = payAppRepository.getIncpData(params);

        if(type.equals("resolution")){
            params.put("evidTypeArr", "1,2,3,4,5,6,7");
        }else{
            params.put("evidTypeArr", "1,2,3,4,5,6,7");
        }

        if(params.containsKey("payIncpReSn")){
            list = payAppRepository.getIncpReG20List(params);
        } else {
            list = payAppRepository.getIncpG20List(params);
        }

        if(list.size() != 0){
            int docNumber = 0;          // 전체 지출결의서 CNT
            docNumber = payAppRepository.getCountDoc(list.get(0));
            int userSq = docNumber + 1;

            Map<String, Object> loginMap = payAppRepository.getEmpInfo(params);
            Map<String, Object> execMap = new HashMap<>();

            int i = 0;
            for(Map<String, Object> data : list) {
                int exnpDocNumber = 0;      // 같은 지출결의서 CNT
                exnpDocNumber = payAppRepository.getIncpCountDoc(data);
                data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
                data.put("USER_SQ", userSq);

                while (true){
                    int duplCheck = payAppRepository.getExnpCheck(data);
                    if (duplCheck == 0) {
                        break;
                    }
                    userSq++;
                    data.put("PMR_NO", data.get("IN_DT") + "-" + String.format("%02d", userSq) + "-" + String.format("%02d", exnpDocNumber + 1));
                }

                Map<String, Object> tradeMap = g20Repository.getTradeInfo(data);
                Map<String, Object> hearnerMap = g20Repository.getHearnerInfo(data);

                if(tradeMap != null) {
                    data.put("REG_NB", tradeMap.get("REG_NB"));
                    data.put("PPL_NB", tradeMap.get("PPL_NB"));
                    data.put("CEO_NM", tradeMap.get("CEO_NM"));
                    data.put("BUSINESS", tradeMap.get("BUSINESS"));
                    data.put("JONGMOK", tradeMap.get("JONGMOK"));
                    data.put("ZIP", tradeMap.get("ZIP"));
                    data.put("DIV_ADDR1", tradeMap.get("DIV_ADDR1"));
                    data.put("ADDR2", tradeMap.get("ADDR2"));
                }

                if(hearnerMap != null) {
                    data.put("ETCDATA_CD", hearnerMap.get("ETCDATA_CD"));
                    data.put("ETCPER_CD", hearnerMap.get("ETCPER_CD"));
                    data.put("ETCREG_NO", hearnerMap.get("ETCREG_NO"));
                    data.put("ETCPER_NM", hearnerMap.get("ETCPER_NM"));
                    data.put("ETCZIP_CD", hearnerMap.get("ETCZIP_CD"));
                    data.put("ETCADDR", hearnerMap.get("ETCADDR"));
                    data.put("ETCPHONE", hearnerMap.get("ETCPHONE"));
                    data.put("ETCBANK_CD", "");
                    data.put("ETCACCT_NO", hearnerMap.get("ETCACCT_NO"));
                    data.put("ETCACCT_NM", hearnerMap.get("ETCACCT_NM"));
                    data.put("ETCRVRS_YM", hearnerMap.get("ETCRVRS_YM"));
                    data.put("ETCDIV_CD", hearnerMap.get("ETCDIV_CD"));
                }

                if(!data.get("RPMR_NO").toString().equals("")){
                    data.put("DOCU_FG", "89");
                    data.put("IN_DT_TMP", data.get("IN_DT"));
                    data.put("IN_DT", data.get("EXEC_DT"));

                } else {
                    data.put("ETCDUMMY1", "76");
                    data.put("IN_DT_TMP", data.get("IN_DT"));
                }


                if(data.get("EVID_TYPE").toString().equals("1")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "1");
                        data.put("TR_FG", "1");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("2")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "1");
                    data.put("TR_FG", "1");
                } else if(data.get("EVID_TYPE").toString().equals("3")){
                    data.put("SET_FG", "3");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "3");
                } else if(data.get("EVID_TYPE").toString().equals("4")){
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");
                } else if(data.get("EVID_TYPE").toString().equals("5")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "3");
                        data.put("TR_FG", "3");
                    }
                } else if(data.get("EVID_TYPE").toString().equals("6")){
                    data.put("SET_FG", "4");
                    data.put("VAT_FG", "2");
                    data.put("TR_FG", "1");
                } else {
                    data.put("SET_FG", "1");
                    data.put("VAT_FG", "3");
                    data.put("TR_FG", "3");

                    if(!data.get("RPMR_NO").toString().equals("")){
                        data.put("SET_FG", "1");
                        data.put("VAT_FG", "2");
                        data.put("TR_FG", "1");
                    }
                }



                g20Repository.insZnSautoabdocu(data);

                if(params.containsKey("payIncpReSn")){
                    payAppRepository.updIncpReStat(data);
                } else {
                    payAppRepository.updIncpMasterStat(data);
                    payAppRepository.updIncpStat(data);
                }

                i++;

                if(list.size() == i){
                    data.put("LOGIN_EMP_CD", loginMap.get("ERP_EMP_SEQ"));
                    g20Repository.execUspAncj080Insert00(data);
                }

            }
        }
    }

    @Override
    public void updPayAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("payDestSn", params.get("payDestSn"));
                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("payDestSn", params.get("payDestSn"));

                payAppRepository.updPayAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "payAtt_" + params.get("payDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void updExnpAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file11, String SERVER_DIR, String BASE_DIR) {
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 세금계산서/계산서 - 세금계산서/계산서 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));
                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 거래명세서 */
        MultipartFile file3 = request.getFile("file3");
        if(file3 != null){
            if(!file3.isEmpty()){
                fileInsMap = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file3");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 검수조서 */
        MultipartFile file4 = request.getFile("file4");
        if(file4 != null){
            if(!file4.isEmpty()){
                fileInsMap = mainLib.fileUpload(file4, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file4");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 세금계산서/계산서 - 납품사진 */
        MultipartFile file5 = request.getFile("file5");
        if(file5 != null){
            if(!file5.isEmpty()){
                fileInsMap = mainLib.fileUpload(file5, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file5");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 매출전표 */
        MultipartFile file6 = request.getFile("file6");
        if(file6 != null){
            if(!file6.isEmpty()){
                fileInsMap = mainLib.fileUpload(file6, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file6");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 거래명세서 */
        MultipartFile file7 = request.getFile("file7");
        if(file7 != null){
            if(!file7.isEmpty()){
                fileInsMap = mainLib.fileUpload(file7, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file7");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 검수조서 */
        MultipartFile file8 = request.getFile("file8");
        if(file8 != null){
            if(!file8.isEmpty()){
                fileInsMap = mainLib.fileUpload(file8, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file8");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 신용카드(재료비) - 납품사진 */
        MultipartFile file9 = request.getFile("file9");
        if(file9 != null){
            if(!file9.isEmpty()){
                fileInsMap = mainLib.fileUpload(file9, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file9");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 소득신고자 - 계좌이체동의서 */
        MultipartFile file10 = request.getFile("file10");
        if(file10 != null){
            if(!file10.isEmpty()){
                fileInsMap = mainLib.fileUpload(file10, filePath(params, SERVER_DIR));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "file10");
                fileInsMap.put("exnpDestSn", params.get("exnpDestSn"));

                payAppRepository.updExnpAttDetData(fileInsMap);
            }
        }

        /** 기타 첨부파일 */
        if(file11.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file11, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPayAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getPayAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "payAtt_" + params.get("payDestSn"));
            returnMap.put("etcFile", payAppRepository.getPayAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPayAttList(Map<String, Object> params) {
        return payAppRepository.getPayAttList(params);
    }

    @Override
    public Map<String, Object> getExnpAttInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = payAppRepository.getExnpAttInfo(params);
        if(returnMap != null){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "exnpAtt_" + params.get("exnpDestSn"));
            returnMap.put("etcFile", payAppRepository.getExnpAttEtcInfo(searchMap));
        }
        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getExnpAttList(Map<String, Object> params) {
        return payAppRepository.getExnpAttList(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public List<Map<String, Object>> getPartRatePay(Map<String, Object> params) {

        params.put("year", params.get("bsYm").toString().split("-")[0]);
        params.put("month", params.get("bsYm").toString().split("-")[1]);

        return payAppRepository.getPartRatePay(params);
    }

    @Override
    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return payAppRepository.getDepositList(params);
    }

    @Override
    public void setPayDepo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.containsKey("payDepoSn")){
            payAppRepository.updPayDepo(params);
        } else {
            payAppRepository.insPayDepo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "payDepo");

        if(params.containsKey("fileSn")){
            Map<String, Object> fileMap = commonRepository.getFileData(params);

            fileMap.put("file_no", fileMap.get("file_no"));
            fileMap.put("payDepoSn", params.get("payDepoSn"));

            payAppRepository.updPayDepoFile(fileMap);
        }


        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("payDepoSn", params.get("payDepoSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                payAppRepository.updPayDepoFile(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getPayDepoData(Map<String, Object> params) {
        return payAppRepository.getPayDepoData(params);
    }

    @Override
    public void setApprIncome(Map<String, Object> params) {
        payAppRepository.updApprStatus(params);
    }

    @Override
    public List<Map<String, Object>> getCheckBudget(Map<String, Object> params) {

        List<Map<String, Object>> list = payAppRepository.getCheckBudget(params);
        return list;
    }

    @Override
    public void delPayApp(int[] params) {
        for(int i = 0 ; i < params.length ; i++){
            payAppRepository.delPayApp(params[i]);

            Map<String, Object> paraMap = new HashMap<>();
            paraMap.put("payAppSn", params[i]);
            paraMap.put("PAY_APP_SN", params[i]);
            List<Map<String, Object>> useEtaxList = payAppRepository.getUseEtaxInfoList(paraMap);
            // dj_use_etax_info 테이블의 CE_GW_IDX값이 있으면 update, 없으면 delete
            for(Map<String, Object> subMap : useEtaxList){
                if(Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseEtaxPayAppNull(paraMap);
                } else {
                    payAppRepository.delUseEtaxInfo(paraMap);
                }
            }
            List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(paraMap);
            for(Map<String, Object> subMap : useCardList){
                if(Integer.parseInt(subMap.get("SNACK_INFO_CHK").toString()) > 0 || Integer.parseInt(subMap.get("BIZ_REQ_CHK").toString()) > 0 ||
                        Integer.parseInt(subMap.get("BIZ_REQ_RESULT_CHK").toString()) > 0 || Integer.parseInt(subMap.get("CE_GW_CHK").toString()) > 0){
                    payAppRepository.updUseCardPayAppNull(paraMap);
                } else {
                    payAppRepository.delUseCardInfo(paraMap);
                }
            }
        }
    }

    @Override
    public void updExnpDe(int[] params, Map<String, Object> params2) {
        for(int i = 0 ; i < params.length ; i++){
            Map<String, Object> map = new HashMap<>();

            map.put("payAppSn", params[i]);
            map.put("payExnpDe", params2.get("payExnpDe"));
            payAppRepository.updExnpDe(map);
        }
    }

    @Override
    public List<Map<String, Object>> getPayAppFileList(Map<String, Object> params) {
        return payAppRepository.getPayAppFileList(params);
    }
    @Override
    public List<Map<String, Object>> getPayAppDocFileList(Map<String, Object> params) {
        return payAppRepository.getPayAppDocFileList(params);
    }

    @Override
    public List<Map<String, Object>> getApprovalExnpFileData(Map<String, Object> params) {
        List<Map<String, Object>> list = payAppRepository.getExnpDetailData(params);
        List<Map<String, Object>> fileList = payAppRepository.getApprovalExnpCommonFileData(params);

        for(Map<String, Object> data : list){
            fileList.add(payAppRepository.getApprovalExnpFileData(data));
        }

        return fileList;
    }

    @Override
    public List<Map<String, Object>> getPjtExnpList(Map<String, Object> params) {
        return payAppRepository.getPjtExnpList(params);
    }

    @Override
    public void setProjectTaxInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectTaxInfo(params);
        } else {
            payAppRepository.updProjectTaxInfo(params);
        }
    }

    @Override
    public Map<String, Object> getProjectSettingInfo(Map<String, Object> params) {
        return payAppRepository.getProjectSettingInfo(params);
    }

    @Override
    public void setProjectBudgetInfo(Map<String, Object> params) {
        if(!params.containsKey("depoSetSn")){
            payAppRepository.insProjectBudgetInfo(params);
        } else {
            payAppRepository.updProjectBudgetInfo(params);
        }
    }

    @Override
    public void payAppRevert(Map<String, Object> params) {

        payAppRepository.payAppRevert(params);

        payAppRepository.insPayAppRevert(params);

        payAppRepository.delPayAppBsYm(params);

        params.put("PAY_APP_SN", params.get("payAppSn"));
        payAppRepository.delUseEtaxInfo(params);
        List<Map<String, Object>> useCardList = payAppRepository.getUseCardInfoList(params);
        for(Map<String, Object> map : useCardList){
            if(Integer.parseInt(map.get("SNACK_INFO_CHK").toString()) > 0){
                payAppRepository.updUseCardPayAppNull(map);
            } else {
                payAppRepository.delUseCardInfo(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getPayDepoFileList(Map<String, Object> params) {
        List<Map<String, Object>> listMap = new ArrayList<>();

        if(params.containsKey("payDepoSn")){
            listMap = payAppRepository.getPayDepoFileList(params);
        } else if(params.containsKey("payIncpSn")){
            listMap = payAppRepository.getPayIncpFileList(params);
        }
        return listMap;
    }

    @Override
    public List<Map<String, Object>> getPayExnpFileList(Map<String, Object> params) {
        return payAppRepository.getPayExnpFileList(params);
    }

    @Override
    public void regReListFile(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        MainLib mainLib = new MainLib();

        /** 신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        List<Map<String, Object>> storedFileArr = payAppRepository.getPayExnpFileList(params);
        payAppRepository.delPayAppFileList(params);

        for(Map<String, Object> map : storedFileArr){
            map.put("contentId", params.get("payAppSn"));
            map.put("fileNo", map.get("file_no"));

            commonRepository.insPayAppFileList(map);
        }

        if(fileList.length > 0){
            params.put("menuCd", "payApp");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("payAppSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPayAppFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getRegIncmReData(Map<String, Object> params) {
        return payAppRepository.getRegIncmReData(params);
    }

    @Override
    public Map<String, Object> setIncpRe(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        map = payAppRepository.getPayIncpReqData(params);
        List<Map<String, Object>> list = payAppRepository.getPayIncpDetailData(params);


        map.put("TR_DE", params.get("inDt"));
        map.put("TOT_AMT", params.get("totAmt"));
        map.put("SUP_AMT", params.get("supAmt"));
        map.put("VAT_AMT", params.get("vatAmt"));
        map.put("EVID_TYPE", list.get(0).get("EVID_TYPE"));
        map.put("TR_CD", list.get(0).get("TR_CD"));
        map.put("CRM_NM", list.get(0).get("CRM_NM"));
        map.put("REG_NO", list.get(0).get("REG_NO"));
        map.put("CRM_BNK_NM", list.get(0).get("CRM_BNK_NM"));
        map.put("CRM_ACC_NO", list.get(0).get("CRM_ACC_NO"));
        map.put("CRM_ACC_HOLDER", list.get(0).get("CRM_ACC_HOLDER"));
        map.put("CARD", list.get(0).get("CARD"));
        map.put("CARD_NO", list.get(0).get("CARD_NO"));
        map.put("ETC", list.get(0).get("ETC"));
        map.put("ISS", list.get(0).get("ISS"));
        map.put("RE_APP_DE", params.get("reAppDe"));

        if(params.containsKey("payIncpReSn")){
            map.put("PAY_INCP_RE_SN", params.get("payIncpReSn"));
            map.put("payIncpReSn", params.get("payIncpReSn"));
            payAppRepository.updIncpRe(map);
        } else {
            payAppRepository.insIncpRe(map);
        }

        return map;
    }

    @Override
    public Map<String, Object> getPayIncpReData(Map<String, Object> params) {
        return payAppRepository.getPayIncpReData(params);
    }

    public void createPdf(Map<String, Object> params, String serverDir, String baseDir) {
        Document document = new Document();

        try {
            // PDF 파일 생성
            String fileUUID = UUID.randomUUID().toString();
            String fileOrgName = "법인카드 지출증빙(지급신청서)";
            String fileCd = "payApp";
            String fileExt = "pdf";

            params.put("menuCd", fileCd);
            String filePathTxt = filePath(params, serverDir);

            // PDF 생성을 위한 OutputStream 생성
            File f = new File(filePathTxt);
            if(!f.exists()) {
                f.mkdirs();
            }

            PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(filePathTxt + fileUUID + "." + fileExt));
            // PDF 파일 열기
            document.open();

            String htmlStr = "<html><body style='font-family: batang;'>"+ params.get("htmlContents") +"</body></html>";

            XMLWorkerHelper helper = XMLWorkerHelper.getInstance();

            CSSResolver cssResolver = new StyleAttrCSSResolver();

            XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
            fontProvider.register("/egovframework/fonts/batang.ttc", "batang"); //MalgunGothic은 font-family용 alias

            CssAppliers cssAppliers = new CssAppliersImpl(fontProvider);
            HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
            htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

            // html을 pdf로 변환시작
            PdfWriterPipeline pdf = new PdfWriterPipeline(document, pdfWriter);
            HtmlPipeline html = new HtmlPipeline(htmlContext, pdf);
            CssResolverPipeline css = new CssResolverPipeline(cssResolver, html);

            XMLWorker worker = new XMLWorker(css, true);
            //캐릭터 셋 설정
            XMLParser xmlParser = new XMLParser(worker, Charset.forName("UTF-8"));

            StringReader strReader = new StringReader(htmlStr);
            xmlParser.parse(strReader);

            document.close();
            pdfWriter.close();

            Map<String, Object> fileParameters = new HashMap<>();
            fileParameters.put("fileCd", fileCd);
            fileParameters.put("fileUUID", fileUUID+"."+fileExt);
            fileParameters.put("fileOrgName", fileOrgName);
            fileParameters.put("filePath", filePath(params, baseDir));
            fileParameters.put("fileExt", fileExt);
            fileParameters.put("fileSize", 99);
            fileParameters.put("contentId", params.get("payAppSn"));
            fileParameters.put("empSeq", "1");

            // 이전에 저장한 파일 삭제
            commonRepository.delContentFileOne(fileParameters);
            // DB에 데이터 저장
            commonRepository.insFileInfoOne(fileParameters);

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Map<String, Object> getPartRatePayBsYm(Map<String, Object> params) {
        return payAppRepository.getPartRatePayBsYm(params);
    }

    @Override
    public void delExnpData(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = payAppRepository.getExnpData(params);

        if(map.get("PAY_APP_DET_SN") != null){
            for(String c : map.get("PAY_APP_DET_SN").toString().split(",")){
                map.put("payAppDetSn", c);
                payAppRepository.updPayAppExnpStatus(map);
            }
        }

        payAppRepository.delExnpData(params);
        payAppRepository.delExnpDetData(params);
    }

    @Override
    public void regExnpCancel(Map<String, Object> params) {

        Map<String, Object> exnpMap = payAppRepository.getExnpDetOne(params);
        // EXNP_DE > IN_DT

        Map<String, Object> g20Map = g20Repository.getExnpDocData(exnpMap);

        payAppRepository.updExnpReStat(params);

        payAppRepository.resolutionExnpReStatus(params);

        g20Repository.execUspAncj080Delete00(g20Map);

        g20Repository.delExnpDocData(g20Map);
    }

    @Override
    public void updateExnpDe(Map<String, Object> params) {
        payAppRepository.updateExnpDe(params);
    }
}
