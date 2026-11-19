import javax.servlet.ServletConfig;
import javax.servlet.http.*;
import java.io.*;
import jp.co.fit.vfreport.Vrw32;

 /**
 * @(#)ExecStreamPrintServlet.java  Sep/26/2017
 *
 * SVF Web Direct Print
 *
 * Sample Program
 *
 */
public class ExecStreamPrintServlet extends HttpServlet {

	//実際のPATH
	private String realPath;

	private void logger(String msg) {
		System.out.println(msg);
	}

	public void init(ServletConfig config) {
		logger("ExecStreamPrintServlet - init called");

		//実際のPATHを取得
		this.realPath = config.getServletContext().getRealPath("/");
	}

	public void destroy() {
		logger("ExecStreamPrintServlet - destroy called");
	}

	public void service(HttpServletRequest req, HttpServletResponse res) throws IOException {

		logger("ExecStreamPrintServlet - service called");

		res.setContentType("text/html;charset=UTF-8");
		long currentTime = System.currentTimeMillis();
		long before = 24 * 60 * 60 * 1000;
		res.setDateHeader("Expires", currentTime - before);
		res.setHeader("Pragma", "No-cache");
		res.setHeader("Cache-Control", "no-cache");

		//フォームのパス
		String formpath = this.realPath + "sample.xml";

		OutputStream os = res.getOutputStream();

		int ret = 0;

		try {
			/** *************************** */
			/* SVFｸﾗｽのｲﾝｽﾀﾝｽ生成 */
			/** *************************** */
			Vrw32 svf = new Vrw32();
			logger("VrSetLocale():" + svf.VrSetLocale("ja"));
			logger("VrInit():" + svf.VrInit("MS932"));
			logger("VrSetPrinter():" + svf.VrSetPrinter("", "EMF"));
			logger("VrSetSpoolFileStream():" + svf.VrSetSpoolFileStream(os));
			logger("VrSetForm():" + svf.VrSetForm(formpath, 4));
			logger("VrComout():" + svf.VrComout("/{SPLM 3}/"));
			logger("VrsOut():" + svf.VrsOut("発行年月日", "2017/03/01"));
			logger("VrsOut():" + svf.VrsOut("発注番号", "1000476"));
			logger("VrsOut():" + svf.VrsOut("仕入先名", "ウイングアーク株式会社"));
			logger("VrsOut():" + svf.VrsOut("仕入先住所", "東京都○○区□□町△△1-1-1"));
			logger("VrsOut():" + svf.VrsOut("仕入先電話番号", "03-1234-5678"));
			logger("VrsOut():" + svf.VrsOut("支払条件", "納入翌月末現金払"));
			logger("VrsOut():" + svf.VrsOut("納品場所","〒222-2222 東京都○△区□○町2-2-2"));
			logger("VrsOut():" + svf.VrsOut("発注明細番号", "1000522"));
			logger("VrsOut():" + svf.VrsOut("商品名", "SVFX-Designer"));
			logger("VrsOut():" + svf.VrsOut("単価", "700000"));
			logger("VrsOut():" + svf.VrsOut("数量", "2"));
			logger("VrsOut():" + svf.VrsOut("仕入先製品番号", "SVF01"));
			logger("VrEndRecord():" + svf.VrEndRecord());
			logger("VrsOut():" + svf.VrsOut("発行年月日", "2017/03/01"));
			logger("VrsOut():" + svf.VrsOut("発注番号", "1000476"));
			logger("VrsOut():" + svf.VrsOut("仕入先名", "ウイングアーク株式会社"));
			logger("VrsOut():" + svf.VrsOut("仕入先住所", "東京都○○区□□町△△1-1-1"));
			logger("VrsOut():" + svf.VrsOut("仕入先電話番号", "03-1234-5678"));
			logger("VrsOut():" + svf.VrsOut("支払条件", "納入翌月末現金払"));
			logger("VrsOut():" + svf.VrsOut("納品場所","〒222-2222 東京都○△区□○町2-2-2"));
			logger("VrsOut():" + svf.VrsOut("発注明細番号", "1000523"));
			logger("VrsOut():" + svf.VrsOut("商品名", "SVF for Java Print"));
			logger("VrsOut():" + svf.VrsOut("単価", "600000"));
			logger("VrsOut():" + svf.VrsOut("数量", "3"));
			logger("VrsOut():" + svf.VrsOut("仕入先製品番号", "SVF02"));
			logger("VrEndRecord():" + svf.VrEndRecord());
			logger("VrsOut():" + svf.VrsOut("発行年月日", "2017/03/01"));
			logger("VrsOut():" + svf.VrsOut("発注番号", "1000476"));
			logger("VrsOut():" + svf.VrsOut("仕入先名", "ウイングアーク株式会社"));
			logger("VrsOut():" + svf.VrsOut("仕入先住所", "東京都○○区□□町△△1-1-1"));
			logger("VrsOut():" + svf.VrsOut("仕入先電話番号", "03-1234-5678"));
			logger("VrsOut():" + svf.VrsOut("支払条件", "納入翌月末現金払"));
			logger("VrsOut():" + svf.VrsOut("納品場所",	"〒222-2222 東京都○△区□○町2-2-2"));
			logger("VrsOut():" + svf.VrsOut("発注明細番号", "1000524"));
			logger("VrsOut():" + svf.VrsOut("商品名", "SVF for PDF"));
			logger("VrsOut():" + svf.VrsOut("単価", "800000"));
			logger("VrsOut():" + svf.VrsOut("数量", "1"));
			logger("VrsOut():" + svf.VrsOut("仕入先製品番号", "SVF03"));
			logger("VrEndRecord():" + svf.VrEndRecord());
			logger("VrPrint():" + svf.VrPrint());
			ret = svf.VrQuit();
			logger("VrQuit():" + ret);
			if (ret > 0) {
				res.setContentLength(ret);
			}
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
