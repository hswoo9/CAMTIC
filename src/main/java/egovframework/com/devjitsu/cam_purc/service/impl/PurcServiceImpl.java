package egovframework.com.devjitsu.cam_purc.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.PRJRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

@Service
public class PurcServiceImpl implements PurcService {


    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private PRJRepository prjRepository;

    @Autowired
    private PayAppRepository payAppRepository;

    @Override
    public List<Map<String, Object>> getPurcReqList(Map<String, Object> params) {
        return purcRepository.getPurcReqList(params);
    }

    @Override
    public List<Map<String, Object>> getPjtPurcItemList(Map<String, Object> params) {
        return purcRepository.getPjtPurcItemList(params);
    }

    @Override
    public void setPurcReq(Map<String, Object> params, MultipartFile[] file, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("purcSn"))){
            purcRepository.setPurcReq(params);
        }else{
            purcRepository.setPurcReqUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 견적서 파일 */
        if(file.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "purcReq_" + params.get("purcSn"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.')+1));
                list.get(i).put("empSeq", params.get("empSeq"));
            }
            commonRepository.insFileInfo(list);
        }

        /** 요청서 파일 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "req_" + params.get("purcSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));

                commonRepository.insOneFileInfo(fileInsMap);
            }
        }

        purcRepository.delPurcItem(params);
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("purcSn", params.get("purcSn"));
            purcRepository.setPurcItem(map);
        }

    }

    @Override
    public Map<String, Object> getPurcReq(Map<String, Object> params) {
        Map<String, Object> returnMap = purcRepository.getPurcReq(params);

        if(returnMap != null){

            if(params.containsKey("itemSn")){
                String[] itemAr = params.get("itemSn").toString().split(",");
                List<Map<String, Object>> itemList = new ArrayList<>();

                for(String item : itemAr){
                    Map<String, Object> itemMap = new HashMap<>();

                    params.put("item", item);
                    itemMap = purcRepository.getPurcItemMap(params);

                    itemList.add(itemMap);
                }
                returnMap.put("itemList", itemList);
            } else {
                returnMap.put("itemList", purcRepository.getPurcItemList(params));
            }

            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("contentId", "est_" + params.get("purcSn"));
            returnMap.put("estFile", purcRepository.getPurcReqFileInfo(searchMap));
            searchMap.put("contentId", "req_" + params.get("purcSn"));
            returnMap.put("reqFile", purcRepository.getPurcReqFileInfo(searchMap));
//            searchMap.put("contentId", "purcReq_" + params.get("purcSn"));
//            returnMap.put("purcFile", purcRepository.getPurcReqFileList(searchMap));
//            searchMap.put("contentId", "purcClaim_" + params.get("claimSn"));
//            returnMap.put("purcFile", purcRepository.getPurcReqFileList(searchMap));
            searchMap.put("contentId", "inspect_" + params.get("purcSn"));
            returnMap.put("inspectFile", purcRepository.getPurcReqFileList(searchMap));

            List<Map<String, Object>> purcFile = new ArrayList<>();
            searchMap.put("contentId", "purcReq_" + params.get("purcSn"));
            if(purcRepository.getPurcReqFileList(searchMap) != null){
                for(Map<String, Object> tempMap : purcRepository.getPurcReqFileList(searchMap)){
                    purcFile.add(tempMap);
                }
            }
            searchMap.put("contentId", "purcClaim_" + params.get("claimSn"));
            if(purcRepository.getPurcReqFileList(searchMap) != null){
                for(Map<String, Object> tempMap : purcRepository.getPurcReqFileList(searchMap)){
                    purcFile.add(tempMap);
                }
            }
            returnMap.put("purcFile", purcFile);
        }

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPurcReqFileList(Map<String, Object> params) {
        params.put("contentId", "inspect_" + params.get("purcSn"));
        return purcRepository.getPurcReqFileList(params);
    }

    @Override
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) {
        return purcRepository.getPurcItemList(params);
    }

    @Override
    public List<Map<String, Object>> getClaimItemList(Map<String, Object> params) {
        return purcRepository.getPurcClaimItemList(params);
    }

    @Override
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) {
        return purcRepository.getPurcItemAmtTotal(params);
    }

    @Override
    public Map<String, Object> getPurcClaimItemAmtTotal(Map<String, Object> params) {
        return purcRepository.getPurcClaimItemAmtTotal(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void updatePurcDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purcSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            purcRepository.updatePurcApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            purcRepository.updatePurcApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            purcRepository.updatePurcFinalApprStat(params);
            purcRepository.updatePurcListFinalApprStat(params);
        }
        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 purcFileList 호출 */
            params.put("contentId", "purcReq_" + params.get("purcSn"));
            List<Map<String, Object>> list = purcRepository.getPurcReqFileList(params);

            if(list.size() > 0){
                for(Map<String, Object> data : list){
                    data.put("docId", params.get("docId"));
                    purcRepository.setPurcFileDocNm(data);
                }
            }
        }
    }

    @Override
    public void updateClaimDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("claimSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            purcRepository.updateClaimApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            purcRepository.updateClaimApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            purcRepository.updateClaimFinalApprStat(params);

            // 현장(카드)결제일때 청구서 결재완료시 검수처리
            Map<String, Object> claimData = purcRepository.getClaimData(params);
            Map<String, Object> paramMap = new HashMap<>();

            params.put("purcSn", claimData.get("PURC_SN"));
            List<Map<String, Object>> claimList = purcRepository.getClaimListByPurcSn(params);
            int ceGwIdx = 0;

            boolean orderFlag = false;
            String orderDt = "";
            String goodsDt = "";

            for(Map<String, Object> data : claimList){
                if(data.get("ORDER_YN").equals("Y")){
                    orderFlag = true;
                    orderDt = String.valueOf(data.get("ORDER_DT"));
                    goodsDt = String.valueOf(data.get("GOODS_DT"));
                    break;
                }
            }
            ceGwIdx = purcRepository.getMaxCeGwIdx(claimData);
            if(claimData.get("PAYMENT_METHOD").equals("C")){
                paramMap.put("purcSn", claimData.get("PURC_SN"));
                paramMap.put("inspectEmpName", claimData.get("EMP_NAME_KR"));
                paramMap.put("status", "100");

                LocalDate now = LocalDate.now();
                DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String fmtNow = now.format(fmt);
                paramMap.put("inspectDt", fmtNow);

                // 현장(카드) 결재일 경우 청구서 결재완료시 검수처리 후 PURC_TYPE이 R OR S 였을 경우에 구매지급요청에 데이터 INSERT
                Map<String, Object> purcReqMap = new HashMap<>();
                purcReqMap.put("claimSn", claimData.get("CLAIM_SN"));
                purcReqMap.put("reqAmt", claimData.get("TOT_AMT"));
                purcReqMap.put("ceGwIdx", ceGwIdx + 1);
                purcReqMap.put("evidType", null);

                if(orderFlag){
                    purcReqMap.put("orderDt", orderDt);
                    purcReqMap.put("goodsDt", goodsDt);
                    purcReqMap.put("orderYn", 'Y');
                } else {
                    purcReqMap.put("orderDt", null);
                    purcReqMap.put("goodsDt", null);
                    purcReqMap.put("orderYn", 'N');
                }

                purcRepository.insPayAppPurcReq(purcReqMap);
                purcRepository.updClaimPurcOrder(purcReqMap);
                purcRepository.updPurcInspect(paramMap);
                purcRepository.updPurcInspectStat(paramMap);
            } else if(claimData.get("PURC_TYPE").equals("R") || claimData.get("PURC_TYPE").equals("S")){
                paramMap.put("purcSn", claimData.get("PURC_SN"));
                paramMap.put("inspectEmpName", claimData.get("EMP_NAME_KR"));
                paramMap.put("status", "100");

                LocalDate now = LocalDate.now();
                DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                String fmtNow = now.format(fmt);
                paramMap.put("inspectDt", fmtNow);


                Map<String, Object> claimSettingMap = new HashMap<>();
                claimSettingMap.put("pjtNm", claimData.get("PJT_NM"));
                claimSettingMap.put("pjtCd", claimData.get("PJT_CD"));
                claimSettingMap.put("claimSn", claimData.get("CLAIM_SN"));
                claimSettingMap.put("empSeq", claimData.get("EMP_SEQ"));
                purcRepository.insPurcBasicSetting(claimSettingMap);

                // 현장(카드) 결재일 경우 청구서 결재완료시 검수처리 후 PURC_TYPE이 R OR S 였을 경우에 구매지급요청에 데이터 INSERT
                Map<String, Object> purcReqMap = new HashMap<>();
                purcReqMap.put("claimSn", claimData.get("CLAIM_SN"));
                purcReqMap.put("reqAmt", claimData.get("TOT_AMT"));
                purcReqMap.put("ceGwIdx", ceGwIdx + 1);
                purcReqMap.put("evidType", null);

                if(orderFlag){
                    purcReqMap.put("orderDt", orderDt);
                    purcReqMap.put("goodsDt", goodsDt);
                    purcReqMap.put("orderYn", 'Y');
                } else {
                    purcReqMap.put("orderDt", null);
                    purcReqMap.put("goodsDt", null);
                    purcReqMap.put("orderYn", 'N');
                }

                purcRepository.insPayAppPurcReq(purcReqMap);
                purcRepository.updClaimPurcOrder(purcReqMap);

//                purcRepository.updPurcInspect(paramMap);
//                purcRepository.updPurcInspectStat(paramMap);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params) {
        return purcRepository.getMngReqPurcList(params);
    }

    @Override
    public void setPurcItemStat(Map<String, Object> params) {
        purcRepository.updPurcItemStat(params);
    }

    @Override
    public void setPurcClaimData(Map<String, Object> params, MultipartFile[] file, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        Map<String, Object> claimMap = new HashMap<>();

        if(params.containsKey("claimSn")){
            claimMap = purcRepository.getClaimData(params);
        }

        if(!params.containsKey("claimSn")){
            purcRepository.insPurcClaimData(params);
        }else{
            params.put("claimSn", claimMap.get("CLAIM_SN"));
            purcRepository.updPurcClaimData(params);
        }

        purcRepository.delPurcClaimItem(params);

        if(params.containsKey("itemSn")){
            String[] itemAr = params.get("itemSn").toString().split(",");

            for(String item : itemAr){
                params.put("item", item);
                purcRepository.updPurcItemStatusChange(params);
            }
        }

        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("claimSn", params.get("claimSn"));

            purcRepository.insPurcClaimItem(map);
        }

        MainLib mainLib = new MainLib();
        params.put("menuCd", "manage");
        /** 견적서 파일 */
        if(file.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "purcClaim_" + params.get("claimSn"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.')+1));
                list.get(i).put("empSeq", params.get("loginEmpSeq"));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getPurcClaimData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();


        if(params.containsKey("claimSn")){
            result = purcRepository.getPurcClaimData(params);
            if(params.containsKey("itemSn")){
                String[] itemAr = params.get("itemSn").toString().split(",");
                List<Map<String, Object>> itemList = new ArrayList<>();
                for(String item : itemAr){
                    Map<String, Object> itemMap = new HashMap<>();
                    params.put("item", item);

                    itemMap = purcRepository.getPurcItemMap(params);

                    itemList.add(itemMap);
                }
                result.put("itemList", itemList);
            } else {
                result.put("itemList", purcRepository.getPurcClaimItemList(params));

                Map<String, Object> map = purcRepository.getPurcClaimData(params);
                List<Map<String, Object>> purcFile = new ArrayList<>();
                Map<String, Object> searchMap = new HashMap<>();

                searchMap.put("contentId", "purcReq_" + map.get("PURC_SN"));
                if(purcRepository.getPurcReqFileList(searchMap) != null){
                    for(Map<String, Object> tempMap : purcRepository.getPurcReqFileList(searchMap)){
                        purcFile.add(tempMap);
                    }
                }

                searchMap.put("contentId", "purcClaim_" + params.get("claimSn"));
                if(purcRepository.getPurcReqFileList(searchMap) != null){
                    for(Map<String, Object> tempMap : purcRepository.getPurcReqFileList(searchMap)){
                        purcFile.add(tempMap);
                    }
                }

                // 결재문서
                if(map.get("PURC_SN") != null){
                    List<String> docIdArr = new ArrayList<>();
                    map.put("purcSn", map.get("PURC_SN"));

                    Map<String, Object> purcInfo = purcRepository.getPurcReq(map);
                    docIdArr.add(purcInfo.get("DOC_ID").toString());
                    params.put("docIdArr", docIdArr);
                    if(purcRepository.getPurcClaimDocId(params) != null){
                        for(Map<String, Object> tempMap : purcRepository.getPurcClaimDocId(params)){
                            purcFile.add(tempMap);
                        }
                    }
                }

                result.put("purcFile", purcFile);
            }
        } else {
            result = null;
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return purcRepository.getPurcClaimList(params);
    }

    @Override
    public Map<String, Object> getPurcClaimItemData(Map<String, Object> params) {
        Map<String, Object> result = purcRepository.getPurcClaimItemData(params);
        return result;
    }

    @Override
    public void delPurcClaimData(Map<String, Object> params) {
        purcRepository.delPurcClaimData(params);
    }

    @Override
    public List<Map<String, Object>> getPurcAssetList(Map<String, Object> params) {
        return purcRepository.getPurcAssetList(params);
    }

    @Override
    public Map<String, Object> getPurcSum(Map<String, Object> params) {
        return purcRepository.getPurcSum(params);
    }

    @Override
    public List<Map<String, Object>> getPurcProductList(Map<String, Object> params) {
        return purcRepository.getPurcProductList(params);
    }

    @Override
    public void updPurcInspect(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        /** 검수 파일 */
        String strWText = "Camtic";
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "inspect_" + params.get("purcSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                if("jpg".equals(list.get(i).get("fileExt")) || "JPG".equals(list.get(i).get("fileExt")) || "png".equals(list.get(i).get("fileExt")) || "PNG".equals(list.get(i).get("fileExt"))) {
                    System.out.println("=============================== Image WaterMark Start ===============================");
                    String fileExt = list.get(i).get("fileExt").toString();
                    try{
                        File sourceImageFile = new File("/home" + list.get(i).get("filePath").toString() + list.get(i).get("fileUUID").toString());
                        File destImageFile = sourceImageFile;


                        BufferedImage sourceImage = ImageIO.read(sourceImageFile);

                        Graphics2D g2d = (Graphics2D) sourceImage.getGraphics();

                        g2d.scale(1, 1);
                        g2d.addRenderingHints(
                                new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON));
                        g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

                        Font font = new Font("나눔고딕", Font.PLAIN, 18);

                        GlyphVector fontGV = font.createGlyphVector(g2d.getFontRenderContext(), strWText);

                        Rectangle size = fontGV.getPixelBounds(g2d.getFontRenderContext(),0,0);

                        Shape textShape = fontGV.getOutline();

                        //double textWidth = size.getWidth();

                        double textWidth = size.getWidth();



                        //double textHeight = size.getHeight();

                        double textHeight = size.getHeight()*3; // 텍스트 간격이다.

                        //AffineTransform rotate45 = AffineTransform.getRotateInstance(Math.PI / 4d);

                        AffineTransform rotate45 = AffineTransform.getRotateInstance(Math.PI / 5d);

                        Shape rotatedText = rotate45.createTransformedShape(textShape);



                        // use a gradient that repeats 4 times

                        g2d.setPaint(new GradientPaint(0, 0,

                                new Color(0f, 0f, 0f, 0.1f),

                                sourceImage.getWidth() / 2, sourceImage.getHeight() / 2,

                                new Color(0f, 0f, 0f, 0.1f)));

                        //new Color(1f, 1f, 1f, 0.1f)));

                        //g2d.setStroke(new BasicStroke(0.5f));

                        g2d.setStroke(new BasicStroke(1f));



                        // step in y direction is calc'ed using pythagoras + 5 pixel padding

                        //double yStep = Math.sqrt(textWidth * textWidth / 2) + 2;

                        double yStep = Math.sqrt(textWidth * textWidth / 2); //



                        System.out.println("yStep : " + yStep);



                        // step over image rendering watermark text

                        //for (double x = -textHeight * 3; x < sourceImage.getWidth(); x += (textHeight * 3)) {



                        for (double x = -textHeight; x < sourceImage.getWidth()/2; x += textHeight) {



                            double y = -yStep;



                            for (; y < sourceImage.getHeight(); y += yStep) {

                                g2d.draw(rotatedText);

                                g2d.fill(rotatedText);

                                g2d.translate(0, yStep);

                            }



                            g2d.translate(textHeight * 3, -(y + yStep));

                        }



                        ImageIO.write(sourceImage, fileExt, destImageFile);

                        g2d.dispose();

                    } catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
            commonRepository.insFileInfo(list);
        }
        purcRepository.updPurcInspect(params);

    }

    @Override
    public void updPurcInspectStat(Map<String, Object> params) {
        purcRepository.updPurcInspectStat(params);

        List<Map<String, Object>> insList = purcRepository.getInsYList(params);

        for(Map<String, Object> map : insList){
            if(map.get("PRODUCT_A").equals("3")){
//                purcRepository.insItemMaster(map);
                purcRepository.insItemWhInfo(map);

                purcRepository.insItemMasterHist(map);
            }
        }
    }

    @Override
    public void updItemUnAssetStat(Map<String, Object> params) {
        purcRepository.updItemUnAssetStat(params);
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return purcRepository.getCrmInfo(params);
    }

    @Override
    public void setOrderInfo(Map<String, Object> params) {
        purcRepository.setOrderInfo(params);
    }

    @Override
    public void setOrderYnInfo(Map<String, Object> params) {
        purcRepository.setOrderYnInfo(params);
    }

    @Override
    public List<Map<String, Object>> getProjectPurcList(Map<String, Object> params) {
        return purcRepository.getProjectPurcList(params);
    }

    @Override
    public List<Map<String, Object>> getProjectPurcReqList(Map<String, Object> params) {
        return purcRepository.getProjectPurcReqList(params);
    }

    @Override
    public Map<String, Object> getPurcClaimDataByPayApp(Map<String, Object> params) {
        return purcRepository.getPurcClaimDataByPayApp(params);
    }

    @Override
    public List<Map<String, Object>> getClaimFileList(Map<String, Object> map) {
        return purcRepository.getClaimFileList(map);
    }

    @Override
    public void delPurcReq(Map<String, Object> params) {
        purcRepository.delPurcReq(params);
        purcRepository.delPurcItem(params);
    }

    @Override
    public void setOnSiteCardPurcClaimData(Map<String, Object> params) {
        Map<String, Object> purcMap = purcRepository.getPurcReq(params);
        List<Map<String, Object>> purcItemMap = purcRepository.getPurcItemList(params);
        Map<String, Object> claimMap = purcRepository.getPurcClaimData(params);

        params.put("purcEmpSeq", purcMap.get("PURC_REQ_EMP_SEQ"));
        params.put("purcType", purcMap.get("PURC_TYPE"));
        params.put("pjtSn", purcMap.get("PJT_SN"));
        params.put("pjtNm", purcMap.get("PJT_NM"));
        params.put("paymentMethod", purcMap.get("PAYMENT_METHOD"));
        params.put("purcLink", purcMap.get("PURC_LINK"));
        params.put("claimDe", purcMap.get("PURC_REQ_DATE"));
        params.put("expDe", purcMap.get("PURC_REQ_DATE"));
        params.put("purcReqPurpose", purcMap.get("PURC_REQ_PURPOSE"));
        params.put("crmSn", purcItemMap.get(0).get("CRM_SN"));
        params.put("crmNm", purcItemMap.get(0).get("CRM_NM"));
        params.put("priPay", "Y");
        params.put("discountAmt", purcMap.get("DISCOUNT_AMT"));
        params.put("vat", purcMap.get("VAT"));
        params.put("checkProfit", "N");

        // 제목
        if(purcMap.get("PURC_TYPE").equals("")){
            params.put("claimTitle", "[법인운영] 구매청구");
        } else if(purcMap.get("PURC_TYPE").equals("R")){
            params.put("claimTitle", "[R&D] 구매청구");
        } else if(purcMap.get("PURC_TYPE").equals("S")){
            params.put("claimTitle", "[비R&D] 구매청구");
        } else if(purcMap.get("PURC_TYPE").equals("D")){
            params.put("claimTitle", "[엔지니어링] 구매청구");
        } else if(purcMap.get("PURC_TYPE").equals("V")){
            params.put("claimTitle", "[용역/기타] 구매청구");
        }

        // 부가세
        int sum = 0;
        double sum2 = 0;
        double sum3 = 0;
        double sum4 = 0;

        for(Map<String, Object> purcItem : purcItemMap){
            sum += Integer.parseInt(purcItem.get("PURC_ITEM_AMT").toString());
        }
        sum2 = Math.round(sum/10);
        sum3 = Math.round(sum/1.1);
        sum4 = sum - sum3;

        if(purcMap.get("VAT").equals("N")){
            params.put("estAmt", sum);
            params.put("vatAmt", sum2);
            params.put("totAmt", sum + sum2);
        } else if(purcMap.get("VAT").equals("Y")){
            params.put("estAmt", sum3);
            params.put("vatAmt", sum4);
            params.put("totAmt", sum);
        } else if(purcMap.get("VAT").equals("D")){
            params.put("estAmt", sum);
            params.put("vatAmt", 0);
            params.put("totAmt", sum);
        }

        System.out.println("params : " + params);


        if(claimMap == null || claimMap.isEmpty()){
            purcRepository.insPurcClaimData(params);
        }else{
            params.put("claimSn", claimMap.get("CLAIM_SN"));
            purcRepository.updPurcClaimData(params);
        }

        purcRepository.delPurcClaimItem(params);

        for(Map<String, Object> map : purcItemMap){
            params.put("item", map.get("PURC_ITEM_SN"));
            params.put("purcItemType", map.get("PURC_ITEM_TYPE"));
            params.put("productA", map.get("PRODUCT_A"));
            params.put("productB", map.get("PRODUCT_B"));
            params.put("productC", map.get("PRODUCT_C"));
            params.put("itemNm", map.get("PURC_ITEM_NAME"));
            params.put("itemStd", map.get("PURC_ITEM_STD"));
            params.put("itemEa", map.get("PURC_ITEM_QTY"));
            params.put("itemUnitAmt", map.get("PURC_ITEM_UNIT_PRICE"));
            params.put("itemUnit", map.get("PURC_ITEM_UNIT"));
            params.put("itemAmt", map.get("PURC_ITEM_AMT"));
            params.put("purcItemAmt", map.get("PURC_ITEM_AMT"));
            params.put("itemEtc", map.get("RMK"));
            purcRepository.updPurcItemStatusChange(params);
            purcRepository.insPurcClaimItem(params);
        }
    }

    @Override
    public Map<String, Object> getPurcAndClaimData(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> itemList = new ArrayList<>();

        if(params.containsKey("purcSn")){
            result = purcRepository.getPurcReq(params);
            itemList =  purcRepository.getPurcItemList(params);
            result.put("itemList", itemList);
        } else {
            result = purcRepository.getClaimData(params);
            itemList =  purcRepository.getPurcClaimItemList(params);
            result.put("itemList", itemList);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getProjectReqFile(Map<String, Object> map) {
        return purcRepository.getProjectReqFile(map);
    }

    @Override
    public List<Map<String, Object>> getMngPurcAppList(Map<String, Object> params) {
        return purcRepository.getMngPurcAppList(params);
    }

    @Override
    public List<Map<String, Object>> getMngPurcAppListExcel(Map<String, Object> params) {
        return purcRepository.getMngPurcAppListExcel(params);
    }

    @Override
    public List<Map<String, Object>> purcFileList(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("contentId", "est_" + params.get("purcSn"));
        if(purcRepository.getPurcReqFileInfo(searchMap) != null){
            list.add(purcRepository.getPurcReqFileInfo(searchMap));
        }
        searchMap.put("contentId", "req_" + params.get("purcSn"));
        if(purcRepository.getPurcReqFileInfo(searchMap) != null){
            list.add(purcRepository.getPurcReqFileInfo(searchMap));
        }
        searchMap.put("contentId", "purcReq_" + params.get("purcSn"));
        if(purcRepository.getPurcReqFileList(searchMap) != null){
            for(Map<String, Object> map : purcRepository.getPurcReqFileList(searchMap)){
                list.add(map);
            }
        }
        searchMap.put("contentId", "purcClaim_" + params.get("claimSn"));
        if(purcRepository.getPurcReqFileList(searchMap) != null){
            for(Map<String, Object> map : purcRepository.getPurcReqFileList(searchMap)){
                list.add(map);
            }
        }
        searchMap.put("contentId", "inspect_" + params.get("purcSn"));
        if(purcRepository.getPurcReqFileList(searchMap) != null){
            for(Map<String, Object> map : purcRepository.getPurcReqFileList(searchMap)){
                list.add(map);
            }
        }

        List<Map<String, Object>> ceFileList = purcRepository.getClaimExnpFileList(params);
        if(!ceFileList.isEmpty()){
            for(Map<String, Object> map : ceFileList){
                list.add(map);
            }
        }

        if(purcRepository.getPurcAddFileList(params) != null){
            List<Map<String, Object>> addFile = purcRepository.getPurcLinkedAddFile(params);

            for(Map<String, Object> map : addFile){
                list.add(map);
            }
        }

        // 결재문서
        /*List<String> docIdArr = new ArrayList<>();*/
        /*if(params.containsKey("purcSn")){
            Map<String, Object> purcInfo = purcRepository.getPurcReq(params);
            docIdArr.add(purcInfo.get("DOC_ID").toString());
            params.put("docIdArr", docIdArr);
        }*/
        /*if(params.containsKey("claimSn")){
            Map<String, Object> claimInfo = purcRepository.getClaimData(params);
            docIdArr.add(claimInfo.get("DOC_ID").toString());
            params.put("docIdArr", docIdArr);
        }*/

        /*if(purcRepository.getPurcClaimDocId(params) != null){
            for(Map<String, Object> map : purcRepository.getPurcClaimDocId(params)){
                list.add(map);
            }
        }*/

        /*params.put("docIdArr", docIdArr);*/

        return list;
    }

    @Override
    public void setPurcFileAdd(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        MainLib mainLib = new MainLib();

        /** 신청서 관련 파일 정보 dj_pay_app_file에 저장  */
        List<Map<String, Object>> storedFileArr = purcRepository.getPurcAddFileList(params);
        purcRepository.delPurcAddFileList(params);

        for(Map<String, Object> map : storedFileArr){
            map.put("contentId", params.get("purcSn"));
            map.put("fileNo", map.get("FILE_NO"));
            map.put("empSeq", map.get("REG_EMP_SEQ"));
            commonRepository.insPurcFileList(map);
        }

        if(fileList.length > 0){
            params.put("menuCd", "purcAdd");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("purcSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

                commonRepository.insFileInfoOne(list.get(i));
                commonRepository.insPurcFileList(list.get(i));
            }
//            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getPurcClaimDocFile(Map<String, Object> params) {

        List<String> docIdArr = new ArrayList<>();
        if(params.containsKey("purcSn")){
            Map<String, Object> purcInfo = purcRepository.getPurcReq(params);
            docIdArr.add(purcInfo.get("DOC_ID").toString());
        }
        if(params.containsKey("claimSn")){
            Map<String, Object> claimInfo = purcRepository.getClaimData(params);
            docIdArr.add(claimInfo.get("DOC_ID").toString());
        }

        params.put("docIdArr", docIdArr);

        return purcRepository.getPurcClaimDocId(params);
    }

    @Override
    public List<Map<String, Object>> getClaimMngList(Map<String, Object> params) {

        String[] claimSnArr = params.get("itemArray").toString().split(",");

        params.put("claimSnArr", claimSnArr);

        List<Map<String, Object>> list = new ArrayList<>();
        list = purcRepository.getClaimMngList(params);

        return list;
    }

    @Override
    public void setPayAppPurcReq(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArray"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        List<Map<String, Object>> payItemArr = gson.fromJson((String) params.get("payItemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        int maxIdx = purcRepository.getGwIdx(params);

        for(Map<String, Object> map : itemArr){
            map.put("ceGwIdx", maxIdx);
//            map.put("evidType", params.get("evidType"));
            map.put("evidType", payItemArr.get(0).get("evidType"));
            purcRepository.insPayAppPurcReq(map);
        }

        MainLib mainLib = new MainLib();
        if(fileList.length > 0){
            params.put("menuCd", "payClaim");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", maxIdx);
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

//                commonRepository.insFileInfoOne(list.get(i));
            }
            commonRepository.insFileInfo(list);
        }

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("CE_GW_IDX", maxIdx);

        for(Map<String, Object> map : payItemArr){
            // dj_file_info contentId 업데이트
            paramMap.put("contentId", "payClaim_" + maxIdx);
            paramMap.put("fileNo", map.get("fileNo"));
            commonRepository.updFileOwnerClaimExnp(paramMap);

            // DJ_USE_CARD_INFO INSERT
            if(!"".equals(map.get("authNo")) && !"".equals(map.get("authHh")) && !"".equals(map.get("authDd")) && !"".equals(map.get("cardNo")) && !"".equals(map.get("buySts"))){
                paramMap.put("AUTH_NO", map.get("authNo"));
                paramMap.put("AUTH_HH", map.get("authHh"));
                paramMap.put("AUTH_DD", map.get("authDd"));
                paramMap.put("CARD_NO", map.get("cardNo"));
                paramMap.put("BUY_STS", map.get("buySts"));
                payAppRepository.insUseCardInfo(paramMap);
            }

            // DJ_USE_ETAX_INFO INSERT
            if(!"".equals(map.get("issNo")) && !"".equals(map.get("coCd")) && !"".equals(map.get("taxTy"))){
                paramMap.put("ISS_NO", map.get("issNo"));
                paramMap.put("CO_CD", map.get("coCd"));
                paramMap.put("TAX_TY", map.get("taxTy"));
                payAppRepository.insUseEtaxInfo(paramMap);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getUserPurcAppList(Map<String, Object> params) {
        return purcRepository.getUserPurcAppList(params);
    }

    @Override
    public Map<String, Object> getClaimExnpData(Map<String, Object> params) {
        return purcRepository.getClaimExnpData(params);
    }

    @Override
    public Map<String, Object> setPurcBasicSetting(Map<String, Object> params) {

        String claimSnAr[] = params.get("itemArr").toString().split(",");

        for(String claimSn : claimSnAr){
            params.put("claimSn", claimSn);
            Map<String, Object> map = purcRepository.getPurcBasicSetting(params);

            if(map != null){
                params.put("claimSetSn", map.get("CLAIM_SET_SN"));
                purcRepository.updPurcBasicSetting(params);
            } else {
                purcRepository.insPurcBasicSetting(params);
            }
        }

        return params;
    }

    @Override
    public Map<String, Object> getBasicSetting(Map<String, Object> params) {
        return purcRepository.getBasicSetting(params);
    }

    @Override
    public List<Map<String, Object>> getHistPurcList(Map<String, Object> params) {
        return prjRepository.getHistPurcList(params);
    }

    public void setOrderSendMailInfo(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        purcRepository.setOrderSendMailInfo(params);

        MainLib mainLib = new MainLib();
        if(fileList.length > 0){
            params.put("menuCd", "orderMail");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("mailSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));

//                commonRepository.insFileInfoOne(list.get(i));
            }
            commonRepository.insFileInfo(list);
        }
    }

    public List<Map<String, Object>> getOrderSendFileList (Map<String, Object> params){
        return purcRepository.getOrderSendFileList(params);
    }

    @Override
    public Map<String, Object> getClaimExnpGwCardList(Map<String, Object> params) {

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> list = purcRepository.getClaimExnpGwCardList(params);

        List<Map<String, Object>> rsList = new ArrayList<>();
        for(Map<String, Object> map : list){
            map.put("authNo", map.get("AUTH_NO"));
            map.put("authHh", map.get("AUTH_HH"));
            map.put("authDd", map.get("AUTH_DD"));
            map.put("cardNo", map.get("CARD_NO"));
            map.put("buySts", map.get("BUY_STS"));

            Map<String, Object> cardMap = purcRepository.getDetailCardInfo(map);

            rsList.add(cardMap);
        }

        result.put("list", rsList);
        return result;
    }

    @Override
    public Map<String, Object> getClaimExnpGwEtaxList(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> list = purcRepository.getClaimExnpGwEtaxList(params);

        List<Map<String, Object>> rsList = new ArrayList<>();

        for(Map<String, Object> map : list){
            map.put("issNo", map.get("ISS_NO"));
            map.put("coCd", map.get("CO_CD"));
            map.put("taxTy", map.get("TAX_TY"));

            Map<String, Object> etaxMap = purcRepository.getDetailEtaxInfo(map);

            rsList.add(etaxMap);
        }

        result.put("rsList", rsList);
        return result;
    }

    @Override
    public List<Map<String, Object>> getPurcReqClaimList(Map<String, Object> params) {
        return purcRepository.getPurcReqClaimList(params);
    }

    @Override
    public List<Map<String, Object>> getPurcReqClaimEmpList(Map<String, Object> params) {
        return purcRepository.getPurcReqClaimEmpList(params);
    }

    @Override
    public List<Map<String, Object>> getPurcClaimExnpList(Map<String, Object> params) {
        return purcRepository.getPurcClaimExnpList(params);
    }

    @Override
    public Map<String, Object> getClaimExnpDataByPay(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result = purcRepository.getClaimExnpDataByPay(params);
        return result;
    }

    @Override
    public void delClaimExnpData(Map<String, Object> params) {
        purcRepository.delClaimExnpData(params);
    }

    @Override
    public void updClaimExpDe(Map<String, Object> params) {
        purcRepository.updClaimExpDe(params);
    }
}
