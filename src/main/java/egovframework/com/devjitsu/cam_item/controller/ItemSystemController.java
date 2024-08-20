package egovframework.com.devjitsu.cam_item.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ItemSystemController {

    @Autowired
    private ItemSystemService itemSystemService;

    @Autowired
    private CrmService crmService;


    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 캠아이템 > 시스템관리 > 시스템  > 고객관리 */

    /**
     * item 고객관리 (crm 고객관리 페이지와 동일)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/crmMaList.do")
    public String customerMaList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/system/crm/crmMaList";
    }

    /**
     * 고객품번등록팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popCrmItemReg.do")
    public String popCrmItemReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("data", crmService.getCrmInfo(params));

        return "popup/cam_item/popCrmItemReg";
    }

    /**
     * 고객품번 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getCrmItemManageList.do")
    public String getCrmItemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemSystemService.getCrmItemManageList(params));
        return "jsonView";
    }

    /**
     * 고객품번 데이터 삭제
     * @param params
     * @return
     */
    @RequestMapping("/item/setCrmItemManageDel.do")
    public String setCrmItemManageDel(@RequestParam Map<String, Object> params){
        itemSystemService.setCrmItemManageDel(params);
        return "jsonView";
    }


    /** 캠아이템 > 시스템관리 > 시스템  > 기초코드등록 */

    /**
     * item 코드 관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/codeManagement.do")
    public String codeManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/system/baseCode/codeManagement";
    }

    /**
     * item 그룹코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/groupCodeList")
    public String groupCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemSystemService.groupCodeList(params));
        return "jsonView";
    }

    /**
     * item 코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/codeList")
    public String codeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemSystemService.codeList(params));
        return "jsonView";
    }

    /**
     * item 그룹코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/saveGroupCode")
    public String saveGroupCode(@RequestParam Map<String, Object> params, Model model){
        itemSystemService.saveGroupCode(params);
        return "jsonView";
    }

    /**
     * item 하위 코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/insSetLgCode")
    public String insSetLgCode(@RequestParam Map<String, Object> params, Model model){
        itemSystemService.insSetLgCode(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/item/smCodeList")
    @ResponseBody
    public List<Map<String, Object>> smCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = new ArrayList<>();

        list = itemSystemService.smCodeList(params);
        return list;
    }

    @RequestMapping("/item/insItemCode")
    public String insitemCode(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = itemSystemService.insItemCode(params);

        model.addAttribute("code", map.get("code").toString());
        return "jsonView";
    }

    @RequestMapping("/item/selLgCode")
    public String selLgCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.selLgCode(params));
        return "jsonView";
    }

    @RequestMapping("/item/selSmCode")
    public String selSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.selSmCode(params));
        return "jsonView";
    }

    @RequestMapping("/item/selLgSmCode")
    public String selLgSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.selLgSmCode(params));
        return "jsonView";
    }

    /** 캠아이템 > 시스템관리 > 시스템  > 품목마스터 */

    /**
     * 품목마스터
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/itemMasterList.do")
    public String itemMasterList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/system/itemMaster/itemMasterList";
    }

    /**
     * 품목 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemMasterList.do")
    public String getItemMasterList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemSystemService.getItemMasterList(params));
        return "jsonView";
    }

    /**
     * 품목 조회(단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemMaster.do")
    public String getItemMaster(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.getItemMaster(params));
        return "jsonView";
    }

    /**
     * 품번등록팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/itemNoReg.do")
    public String itemNoReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/itemNoReg";
    }

    /**
     * 품번중복확인
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemNoDuplicate.do")
    public String getItemDuplicate(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.getItemNoDuplicate(params));
        return "jsonView";
    }

    /**
     * 품번중복확인
     * @param params
     * @return
     */
    @RequestMapping("/item/setItemMasterReg.do")
    public String setItemMasterReg(@RequestParam Map<String, Object> params){
        itemSystemService.setItemMasterReg(params);
        return "jsonView";
    }

    /**
     * 품번삭제
     * @param params
     * @return
     */
    @RequestMapping("/item/setItemMasterDel.do")
    public String setItemMasterDel(@RequestParam Map<String, Object> params){
        itemSystemService.setItemMasterDel(params);
        return "jsonView";
    }

    /** 품목카테고리관리 */
    @RequestMapping("/item/itemCategoryMng.do")
    public String itemCategoryMng(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/system/itemCategoryMa/itemCategoryMng";
    }

    /** 품목카테고리 리스트 */
    @RequestMapping("/item/getItemCategoryList")
    public String getItemCategoryList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("list", itemSystemService.getItemCategoryList(params));
        return "jsonView";
    }

    /** 품목카테고리 조회(단일) */
    @RequestMapping("/item/getItemCategoryOne")
    public String getItemCategoryOne(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.getItemCategoryOne(params));
        return "jsonView";
    }

    /** 카테고리등록팝업 */
    @RequestMapping("/item/pop/itemCategoryReg.do")
    public String itemCategoryReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/itemCategoryReg";
    }

    /** 코드중복확인 */
    @RequestMapping("/item/getCgDuplicateChk")
    public String getCgDuplicateChk(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.getCgDuplicateChk(params));
        return "jsonView";
    }

    /** 코드등록 */
    @RequestMapping("/item/setItemCategoryReg")
    public String setItemCategoryReg(@RequestParam Map<String, Object> params){
        itemSystemService.setItemCategoryReg(params);
        return "jsonView";
    }

    /** 코드 삭제 */
    @RequestMapping("/item/setItemCategoryDel")
    public String setItemCategoryDel(@RequestParam Map<String, Object> params) {
        itemSystemService.setItemCategoryDel(params);
        return "jsonView";
    }

    @RequestMapping("/item/delDetCode")
    public String delDetCode(@RequestParam Map<String, Object> params, Model model) {
        try{
            itemSystemService.delDetCode(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 품번 가져오기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemNo")
    public String getItemNo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemSystemService.getItemNo(params));
        return "jsonView";
    }
}
