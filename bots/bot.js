const { Telegraf } = require('telegraf')
const usersModel = require('../database/users')

const jumbe = [
    'Jambo la hakika zaidi kwetu ni uwezo wetu wa kuumba, kushinda, kuteseka, kubadilisha, kuthamini, na kuwa mkuu kuliko mateso yetu.',
    'Maisha yamejaa vituko. Kunyakua nafasi ya adventure. Itakutengeneza kuwa mtu bora zaidi.',
    'Furaha ya maisha iko ndani yako mwenyewe. Kwa muda mrefu unaamini unatosheka, wewe ni mchangamfu.',
    'Iote. Itamani. Fanya. Pia, usikate tamaa.',
    'Ishi maisha yako ili uweze kusema "Ninapenda maisha yangu" na kumaanisha kweli.',
    'Maisha sio mazoea. Kila siku ni onyesho jipya, hakuna kurudia, hakuna kurudi nyuma, hakuna kurudia. Pia, fanya kwa uangalifu: ishi bora zaidi, chagua bora zaidi na fanya bora zaidi..',
    'Maisha si ya kiasi. Ni ya thamani zaidi kuliko unavyofikiri. Kwa hivyo, unahitaji kuheshimu kila kiumbe maishani. Heshimu kila kitu ambacho kimekupa.',
    'Walakini, kuwa na moyo mkunjufu na shukrani kwa ajili yako maisha na mambo ambayo umefanikisha katika maisha haya. Pia, kuna watu ambao wana upungufu wa kile ambacho bado kina furaha zaidi kuliko sisi.',
    'Kila mkuu ana hadithi iliyojaa huzuni na mapambano. Walakini, wakipigana na kila moja ya hizo, walitoka kama nyota zinazoangaza za hatima yao, kama ulimwengu.',
    'Wakati maisha yanaonekana kuwa magumu, shikilia. Hata hivyo, bado hujatazama ukurasa ufuatao wa kitabu cha uzima. Imejaa mafumbo, mashaka, uzoefu na mafanikio ambayo hayajafikiwa.'
]

const imp = {
    shemdoe2: 6638791469
}


const myBotsFn = async () => {
    try {
        const tokens = [process.env.ZUCHU_TKN, process.env.KAJALA_TKN]

        for (let tk of tokens) {
            const bot = new Telegraf(tk).catch(e2=> console.log(e2.message))

            bot.catch(async (e, ctx)=> {
                console.log(e)
                await bot.telegram.sendMessage(imp.shemdoe2, e.message)
            })

            bot.start(async ctx => {
                try {
                    let chatid = ctx.chat.id
                    let first_name = ctx.chat.first_name
                    let botname = ctx.botInfo.username
                    let user = await usersModel.findOne({chatid})
                    if(!user) {
                        await usersModel.create({chatid, first_name, botname})
                        await bot.telegram.sendMessage(imp.shemdoe2, `${first_name} added to db via ${botname}`)
                    }
                    await ctx.reply(`Hello ${first_name}!\n\nKaribu. Kupata jumbe tamu za kutia moyo za maisha \nbonyeza hapa 👉 /ujumbe`)
                } catch (e) {
                    console.log(e.message, e)
                }
            })

            bot.command('ujumbe', async ctx=> {
                try {
                    let rand = Math.floor(Math.random() * jumbe.length)
                    await ctx.reply(jumbe[rand])
                } catch (err_ujumbe) {
                    console.log(err_ujumbe.message)
                }
            })

            bot.launch().catch(async ee => {
                await bot.telegram.sendMessage(imp.shemdoe2, ee.message)
                console.log(ee.message)
            })
        }
    } catch (err) {
        console.log(err.message, err)
    }
}


module.exports = {
    myBotsFn
}
